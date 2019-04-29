using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tarefas_Api.Models;

namespace Tarefas_Api.Context
{
    public class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions<ContextDb> options)
            :base(options)
        { }

        public DbSet<Tasks> Tasks { get; set; }

        // FLUENT API
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Mapping the table Tasks
            builder.Entity<Tasks>().ToTable("Tarefas");
            builder.Entity<Tasks>().HasKey(t => t.id);

            builder.Entity<Tasks>().Property(t => t.Description)
                .IsRequired()
                .HasColumnName("description");

            builder.Entity<Tasks>().Property(t => t.Done)
                .IsRequired()
                .HasColumnName("done");

            builder.Entity<Tasks>().Property(t => t.CreatedAt)
                .IsRequired()
                .HasColumnName("createdAt");
        }


    }
}
