﻿using Finance_Helper.Models;
using Finance_Helper.Service.UsuarioService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Finance_Helper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioInterface _usuarioInterface;
        public UsuarioController(IUsuarioInterface usuarioInterface)
        {
            _usuarioInterface = usuarioInterface;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<UsuarioModel>>>> GetUsuarios()
        {
            return Ok( await _usuarioInterface.GetUsuarios());
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<ServiceResponse<string>>> RefreshToken([FromBody] string refreshToken)
        {
            var response = await _usuarioInterface.RefreshToken(refreshToken);

            if (!response.Sucesso)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }


        [HttpPost("login")]
        [Produces("application/json")]
        public async Task<ActionResult<ServiceResponse<string>>> Login(
            [FromBody] UsuarioLoginDto loginDto)
        {
            var response = await _usuarioInterface.Login(loginDto.Username, loginDto.Password);

            if (!response.Sucesso)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}
