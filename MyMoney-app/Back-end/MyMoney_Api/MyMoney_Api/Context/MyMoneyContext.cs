using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMoney_Api.Models;

namespace MyMoney_Api.Context
{
    public class MyMoneyContext : DbContext
    {
        public MyMoneyContext(DbContextOptions<MyMoneyContext> options) : base(options)
        { }

        public DbSet<Credit> Credits { get; set; }
        public DbSet<Debt> Debts { get; set; }
        public DbSet<BillingCycle> BillingCyles { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>(entity => {
                entity.ToTable("users");
                entity.HasKey(u => u.Id).HasName("Id");
                entity.Property(u => u.Email).HasColumnType("VARCHAR(100)").HasColumnName("User_Email");
                entity.Property(u => u.Password).HasColumnType("VARCHAR(100)").HasColumnName("User_Password");
                entity.Property(u => u.Name).HasColumnType("VARCHAR(100)").HasColumnName("Name");
            });

            modelBuilder.Entity<Credit>(entity =>
            {
                entity.ToTable("credit");
                entity.HasKey(c => c.CreditID).HasName("CreditID");
                entity.Property(c => c.Value).HasColumnType("DECIMAL(6.2)").HasColumnName("CreditValue");
                entity.Property(c => c.Name).HasColumnType("VARCHAR(120)").HasColumnName("CreditName");
                entity.Property(c => c.CycleID).HasColumnType("INT(11)").HasColumnName("CycleFK");
                entity.HasOne(b => b.Cycle).WithMany(c => c.Credits).HasForeignKey(c => c.CycleID).HasConstraintName("credit_ibfk_1").OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Debt>(entity =>
            {
                entity.ToTable("debt");
                entity.HasKey(d => d.DebtID).HasName("DebtID");
                entity.Property(d => d.Name).HasColumnType("VARCHAR(120)").HasColumnName("DebtName");
                entity.Property(d => d.Status).HasColumnType("ENUM('PAGO','PENDENTE','AGENDADO')").HasColumnName("DebtStatus");
                entity.Property(d => d.Value).HasColumnType("DECIMAL(6.2)").HasColumnName("DebtValue");
                entity.Property(d => d.CycleID).HasColumnType("INT(11)").HasColumnName("CycleFK");
                entity.HasOne(b => b.Cycle).WithMany(d => d.Debts).HasForeignKey(d => d.CycleID).HasConstraintName("debt_ibfk_1").OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<BillingCycle>(entity =>
            {
                entity.ToTable("billingcycle");
                entity.HasKey(b => b.CycleID).HasName("CycleID");
                entity.Property(b => b.Name).HasColumnType("VARCHAR(120)").HasColumnName("CycleName");
                entity.Property(b => b.Month).HasColumnType("INT").HasColumnName("CycleMonth");
                entity.Property(b => b.Year).HasColumnType("INT").HasColumnName("CycleYear");
            });      
        }
    }
}
