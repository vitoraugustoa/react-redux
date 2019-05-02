using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyMoney_Api.Models
{
    public partial class BillingCycle
    {

        public int CycleID { get; set; }
        
        public string Name { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }


        public virtual List<Credit> Credits { get; set; }
        public virtual List<Debt> Debts { get; set; }
    }
}
