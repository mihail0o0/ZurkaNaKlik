using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Kategorija
    {
        [Key]
        public int Id { get; set;}
        public required string Naziv { get; set;} //Slatko/slano/posno

    

        public List<MeniKeteringa>? ListaMenija { get; set; }  

        public Agencija? Agencija  {get; set;}  
    }
}