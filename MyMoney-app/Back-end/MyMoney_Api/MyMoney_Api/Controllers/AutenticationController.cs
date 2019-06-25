using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using MyMoney_Api.Models;
using MyMoney_Api.Context;
using Microsoft.EntityFrameworkCore;
using MyMoney_Api.ViewModels;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace MyMoney_Api.Controllers
{
    [Authorize("Bearer")]
    [DisableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticationController : ControllerBase
    {
        private readonly MyMoneyContext _context;

        public AutenticationController(MyMoneyContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginRequestViewModel userLogin)
        {
            try
            {
                var user = await _context.Users.AsNoTracking().SingleOrDefaultAsync(u => u.Email == userLogin.Email && u.Password == userLogin.Password);

                if (user.Email == null)
                {
                    return Unauthorized();
                }

                var userLogged = new UserLoginResponseViewModel()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Token = GenerateToken(),
                };

                return Ok(userLogged);

            }
            catch (Exception e)
            {
                return Unauthorized(e);
            }
        }



        [AllowAnonymous]
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if(user == null)
            {
                return BadRequest();
            }

            try
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                var userRegistered = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);

                var userLogged = new UserLoginResponseViewModel()
                {
                    Id = userRegistered.Id,
                    Name = userRegistered.Name,
                    Email = userRegistered.Email,
                    Token = GenerateToken(),
                };

                return Ok(userLogged);
            }
            catch (DbUpdateException e)
            {
                return Conflict(e);
            }
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser([FromQuery] int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(true);
            }
            catch (DbUpdateException e)
            {
                return Conflict(e);
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<ActionResult> UpdateUser([FromBody] User user)
        {
            if(user == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(true);
            }
            catch(DbUpdateException e)
            {
                return Conflict(e); 
            }
        }

        private string GenerateToken()
        {
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
            };

            // Gerar o token
            SymmetricSecurityKey symmetricSecurity = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("senhasupersecretaparaauth"));
            SigningCredentials signingCredentials = new SigningCredentials(symmetricSecurity, SecurityAlgorithms.HmacSha256);
            JwtHeader jwtHeader = new JwtHeader(signingCredentials);
            JwtPayload jwtPayload = new JwtPayload(claims);
            JwtSecurityToken token = new JwtSecurityToken(jwtHeader, jwtPayload);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = true, // Because there is no expiration in the generated token
                ValidateAudience = false, // Because there is no audiance in the generated token
                ValidateIssuer = false,   // Because there is no issuer in the generated token
                ValidIssuer = "Sample",
                ValidAudience = "Sample",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("senhasupersecretaparaauth")) // The same key as the one that generate the token
            };
        }

    }
}
