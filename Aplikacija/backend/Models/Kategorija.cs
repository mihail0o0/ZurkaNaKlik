namespace backend.Models
{
    public class Kategorija
    {

        public int Id { get; set;}
        public required string Naziv { get; set;} //Slatko/slano/posno

    

        public List<MeniKeteringa>? ListaMenija { get; set; }  

        public required Agencija? Agencija  {get; set;}  
    }
}