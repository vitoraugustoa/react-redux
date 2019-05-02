using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMoney_Api.Context;
using MyMoney_Api.Models;
using MyMoney_Api.ViewModels;
using Newtonsoft.Json;

namespace MyMoney_Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("Cycle")]
    [ApiController]
    public class CyclesController : ControllerBase
    {

        private readonly MyMoneyContext _context;

        public CyclesController(MyMoneyContext context)
        {
            _context = context;
        }

        // Buscar todos os Cycles com paginação
        [HttpGet("GetAll/{actualPage}")]
        public ActionResult<string> GetAll([FromRoute] int actualPage)
        {
            int pageLimit = 5;

            List<BillingCycle> billings = _context.BillingCyles.Include(c => c.Credits).Include(d => d.Debts).AsNoTracking().ToList();

            return JsonConvert.SerializeObject(billings);
        }

        


        // Buscar a quantiade de Cyclos
        [Route("Count")]
        [HttpGet]
        public IActionResult GetCount()
        {
            CycleCountViewModel countCycles = new CycleCountViewModel
            {
                CycleCount = _context.BillingCyles.AsNoTracking().Count()
            };

            if(countCycles == null)
            {
                return NotFound();
            }

            return Ok(JsonConvert.SerializeObject(countCycles));
        }

        // Buscar a soma de todos os creditos e debitos de todos os Cyclos
        [Route("Summary")]
        [HttpGet]
        public IActionResult GetSummary()
        {   
            decimal credits = _context.Credits.AsNoTracking().Sum(c => c.Value);
            decimal debts = _context.Debts.AsNoTracking().Sum(d => d.Value);

            CycleSummaryViewModel summary = new CycleSummaryViewModel
            {
                Credits = credits,
                Debts = debts
            };

            return Ok(JsonConvert.SerializeObject(summary));
        }

        // Buscar um Cyclo por ID
        [Route("GetCyclo/{id}")]
        [HttpGet]
        public async Task<ActionResult<BillingCycle>> GetById([FromRoute] int id)
        {
            BillingCycle cycle = await _context.BillingCyles.FindAsync(id);

            if (cycle == null)
            {
                return NotFound();
            }

            return Ok(JsonConvert.SerializeObject(cycle));
        }


        // Cadastrar novo cycle e retornar o mesmo.
        [HttpPost("CreateCycle")]
        public async Task<ActionResult<BillingCycle>> CreateCycle([FromBody] BillingCycle cycle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.BillingCyles.AddAsync(cycle);
            await _context.SaveChangesAsync();

            return Ok(cycle);
        }
        
        // Incluir Credito em Cycle existente.
        [HttpPost("IncludeCredit")]
        public async Task<ActionResult<Credit>> IncludeCredit([FromBody] Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            BillingCycle billing = await _context.BillingCyles.FindAsync(credit.CycleID);

            if (billing == null)
            {
                return NotFound();
            }

            credit.Cycle = billing;

            await _context.Credits.AddAsync(credit);
            await _context.SaveChangesAsync();
            return Ok(JsonConvert.SerializeObject(credit));
        }

        // Incluir Debito em Cycle existente.
        [HttpPost("IncludeDebt")]
        public async Task<ActionResult<Debt>> IncludeDebt([FromBody] Debt debt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            BillingCycle billing = await _context.BillingCyles.FindAsync(debt.CycleID);

            if (billing == null)
            {
                return NotFound();
            }

            debt.CycleID = billing.CycleID;

            await _context.Debts.AddAsync(debt);
            await _context.SaveChangesAsync();
            return Ok(JsonConvert.SerializeObject(debt));
        } 

        // Atualizar novo cycle e retornar o mesmo
        [HttpPut("UpdateCyclo")]
        public async Task<ActionResult<BillingCycle>> UpdateCyclo([FromBody] BillingCycle cycle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (cycle == null)
            {
                return BadRequest();
            }

            _context.Entry(cycle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!CycleExists(cycle.CycleID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(JsonConvert.SerializeObject(cycle));
        }

        // Atualizar Credit
        [HttpPut("UpdateCredit")]
        public async Task<ActionResult<Credit>> UpdateCredit([FromBody] Credit credit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            } 

            if (credit == null)
            {
                return BadRequest();
            }

            _context.Entry(credit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!CreditExists(credit.CreditID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(JsonConvert.SerializeObject(credit));
        }

        // Atualizar Debt
        [HttpPut("UpdateDebt")]
        public async Task<ActionResult<Debt>> UpdateDebt([FromBody] BillingCycle debt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (debt == null)
            {
                return BadRequest();
            }

            _context.Entry(debt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DebtExists(debt.CycleID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(JsonConvert.SerializeObject(debt));
        }

        // Deletar ciclo
        [HttpDelete("DeleteCyclo/{id}")]
        public async Task<ActionResult<BillingCycle>> DeleteCyclo([FromRoute] int id)
        {

            BillingCycle cycle = await _context.BillingCyles.FindAsync(id);

            if(cycle == null)
            {
                return NotFound();
            }

            _context.BillingCyles.Remove(cycle);
            await _context.SaveChangesAsync();

            return Ok(JsonConvert.SerializeObject(cycle));
        }

        // Deletar Credito
        [HttpDelete("DeleteCredit/{id}")]
        public async Task<ActionResult<Credit>> DeleteCredit([FromRoute] int id)
        {
            Credit credit = await _context.Credits.FindAsync(id);

            if(credit == null)
            {
                return NotFound();
            }

            _context.Credits.Remove(credit);
            await _context.SaveChangesAsync();

            return Ok(JsonConvert.SerializeObject(credit));
        }

        // Deletar Debito
        [HttpDelete("DeleteDebt/{id}")]
        public async Task<ActionResult<BillingCycle>> DeleteDebt([FromRoute] int id)
        {
            Debt debt = await _context.Debts.FindAsync(id);

            if (debt == null)
            {
                return NotFound();
            }

            _context.Debts.Remove(debt);
            await _context.SaveChangesAsync();

            return Ok(JsonConvert.SerializeObject(debt));
        }

        private bool CycleExists(int id)
        {
            return _context.BillingCyles.Any(t => t.CycleID == id);
        }

        private bool CreditExists(int id)
        {
            return _context.Credits.Any(t => t.CreditID == id);
        }

        private bool DebtExists(int id)
        {
            return _context.Debts.Any(t => t.DebtID == id);
        }
    }
}