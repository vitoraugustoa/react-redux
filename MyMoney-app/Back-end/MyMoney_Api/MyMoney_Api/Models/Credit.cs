using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyMoney_Api.Models
{
    public partial class Credit
    {
        public int CreditID { get; set; }

        public string Name { get; set; }

        public decimal Value { get; set; }



        public int? CycleID { get; set; }
        public virtual BillingCycle Cycle { get; set; }
    }
}
