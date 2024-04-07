using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class OglasObjekta
    {
        public required List<EnumTipProslava> ListaTipProslava { get; set; }
        public required List<EnumTipProstora> ListaTipProstora { get; set; }
        public required string Naziv { get; set; }
        public required string Grad { get; set; }
        public required string Lokacija { get; set; }
        public required int CenaPoDanu { get; set; }
        public required int BrojSoba { get; set; }
        public required int Kvadratura { get; set; }
        public required int BrojKreveta { get; set; }
        public required int BrojKupatila { get; set; }
        public required EnumGrejanje Grejanje { get; set; }
        public required List<EnumDodatnaOprema> ListDodatneOpreme { get; set; }
        public required string BrTel { get; set; }
        public required string Opis { get; set; }
        public required List<string> Slike { get; set; }
        public int? Ocena { get; set; }
        public int BrojOcena { get; set; }
        public DateTime? ZausetiDani { get; set; }

    }
}