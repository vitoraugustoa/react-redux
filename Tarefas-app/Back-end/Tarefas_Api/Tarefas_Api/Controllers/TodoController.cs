using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tarefas_Api.Context;
using Tarefas_Api.Models;

namespace Tarefas_Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("Todo")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ContextDb _context;

        public TodoController(ContextDb context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tasks>>> GetAllTasks()
        {
            return await _context.Tasks.OrderBy(t => t.CreatedAt).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tasks>> GetTask([FromRoute] int id)
        {
            Tasks task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        [Route("description/{description}")]
        [HttpGet]
        public async  Task<ActionResult<IEnumerable<Tasks>>> GetTasksByDescription([FromRoute] string description)
        {
            IQueryable<Tasks> query = from s in _context.Tasks
                        where EF.Functions.Like(s.Description , $"%{description}%")
                        orderby s.CreatedAt
                        select s;

            if(!query.Any())
            {
                return NotFound();
            }

            return await query.ToListAsync();

        }

        [HttpPut]
        public async Task<ActionResult> PutTask([FromBody] Tasks task)
        {
            if(task == null)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(task.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult<Tasks>> PostTask([FromBody] Tasks task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            task.CreatedAt = DateTime.Now;

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Tasks>> DeleteTask([FromRoute] int id)
        {
            Tasks task = await _context.Tasks.FindAsync(id);

            if(task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return task;
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(t => t.id == id);
        }
    }
}