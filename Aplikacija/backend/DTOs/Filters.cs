using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class Filters
    {
        public string? Sort { get; set; }
        public List<EnumTipProslava>? TipProslava { get; set; }
        public List<EnumTipProstora>? TipProstora { get; set; }
        public string? Grad { get; set; }
        public int CenaOd { get; set; }
        public int CenaDo { get; set; }
        public int KvadraturaOd { get; set; }
        public int KvadraturaDo { get; set; }
        public List<EnumGrejanje>? Grejanje { get; set; }
        public List<EnumDodatnaOprema>? DodatnaOprema { get; set; }
        public DateTime DatumOd { get; set; }
        public DateTime DatumDo { get; set; }
    }
}