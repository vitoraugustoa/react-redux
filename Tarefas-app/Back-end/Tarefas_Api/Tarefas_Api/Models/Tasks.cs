using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tarefas_Api.Models
{
    public class Tasks
    {
        public int id { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
