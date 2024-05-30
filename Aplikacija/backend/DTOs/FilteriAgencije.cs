using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class FilteriAgencije
    {
        public List<string>? ListaKategorija { get; set; }
        public int CenaDostaveOd { get; set; }
        public int CenaDostaveDo { get; set; }
        public bool MogucnostDostave { get; set; }
        public string? Grad { get; set; }

        public string? sort { get; set; }
        
        
    }
}