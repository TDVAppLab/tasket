using Microsoft.EntityFrameworkCore;

namespace server_app.Models.EDM
{
    public partial class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<t_task> t_tasks {get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<t_task>(entity =>
            {
                entity.HasKey(e => new { e.id_task });

            });
        }
    }
}