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
        public required ZakupljeniOglas ZakupljeniOglas { get; set; }
        public bool StatusRezervacije { get; set; }
        public DateTime DatumRezervacije { get; set; }

        [JsonIgnore]
        public required List<MeniKeteringa>? ZakupljeniMeniji { get; set; }
        [JsonIgnore]
        public Agencija? Agencija { get; set; }
    }
}