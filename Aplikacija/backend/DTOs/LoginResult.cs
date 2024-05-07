using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class LoginResult
    {
        public int id { get; set; }
        public required string name { get; set; }
        public required string email { get; set; }
        public required string phoneNumber { get; set; }
        public required Roles role { get; set; }
        public string? profilePhoto { get; set; }
        public string? location { get; set; }
        public string? lastName { get; set; }
        public string? description { get; set; }
        public int? grade { get; set; }
        public int? numberOfGrades { get; set; } = 0;
        public bool? doesDelivery { get; set; }
        public int? deliveryPrice { get; set; }
        public string RefreshToken { get; set; } = string.Empty;

        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
    }
}