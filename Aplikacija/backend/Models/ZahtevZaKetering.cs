using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Routing.Patterns;

namespace backend.Models
{
    public class ZahtevZaKetering
    {
        [Key]
        public int Id { get; set; }
        public int KonacnaCena { get; set; }
        public ZakupljeniOglas? ZakupljeniOglas { get; set; }
        public bool StatusRezervacije { get; set; }
        public DateTime DatumRezervacije { get; set; }
<<<<<<< HEAD
        [JsonIgnore]
        [InverseProperty("ListaZahetevaZaKetering")]
        public List<MeniKeteringa>? ZakupljeniMeniji { get; set; }
=======
        // [JsonIgnore]
        // public List<MeniKeteringa> ZakupljeniMeniji { get; set; }
>>>>>>> 3d2df5ca0ea86124602966b7f5f0b0d424c16b1d
        [JsonIgnore]
        public Agencija? Agencija { get; set; }
    }
}