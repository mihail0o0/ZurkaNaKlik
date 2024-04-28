using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class LoginObject
    {
        public required string Email { get; set; }
        public virtual Roles Role { get; set; }
    }
}