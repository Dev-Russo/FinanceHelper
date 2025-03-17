namespace Finance_Helper.Models
{
    public class ServiceResponse<T>
    {
        public T? Dados { get; set; }

        public string Mensagem { get; set; }

        public bool Suceeso { get; set; }
    }
}
