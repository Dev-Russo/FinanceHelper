using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Finance_Helper.DataContext;
using Finance_Helper.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.IdentityModel.Tokens;

namespace Finance_Helper.Service.UsuarioService
{
    public class UsuarioService : IUsuarioInterface
    {
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _configuration;

        public UsuarioService(ApplicationDBContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public Task<ServiceResponse<List<UsuarioModel>>> Createusuario(UsuarioModel newUsuario)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<UsuarioModel>>> DeleteUsuario(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<List<UsuarioModel>>> GetUsuarios()
        {
            ServiceResponse<List<UsuarioModel>> serviceResponse = new ServiceResponse<List<UsuarioModel>>();

            try
            {
                serviceResponse.Dados = _context.Usuarios.ToList();
            }
            catch (Exception ex) 
            { 
                serviceResponse.Mensagem = ex.Message;
                serviceResponse.Sucesso = false;
            }


            return serviceResponse;
        }

        public Task<ServiceResponse<UsuarioModel>> GetUsuariosById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<UsuarioModel>>> UpdateUsusario(UsuarioModel editadoUsuario)
        {
            throw new NotImplementedException();
        }

        private string GenerateToken(UsuarioModel usuario)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: new[]
                {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email)
                },
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool VerificarSenha(string senhaDigitada, string senhaArmazenada)
        {
            return senhaDigitada == senhaArmazenada;
        }

        public async Task<ServiceResponse<string>> Login(string email, string senha)
        {
            var response = new ServiceResponse<string>();

            // Buscando o usuário no banco de dados
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

            if (usuario == null)
            {
                response.Sucesso = false;
                response.Mensagem = "Usuário não encontrado.";
                return response;
            }

            // Se a senha estiver errada
            if (!VerificarSenha(senha, usuario.Senha)) // Use 'Senha' e não 'SenhaHash'
            {
                response.Sucesso = false;
                response.Mensagem = "Senha incorreta.";
                return response;
            }

            // Se estiver tudo certo, gera o token JWT
            response.Dados = GenerateToken(usuario);
            return response;
        }
    }
}
