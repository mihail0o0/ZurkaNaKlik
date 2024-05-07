using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Models
{
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }
        public required string Token { get; set; }
    }
}