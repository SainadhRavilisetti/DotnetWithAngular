using System;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.Data;

public class ProfileDB(DbContextOptions options) : DbContext(options)
{
    public DbSet<Profile> profiles{ get; set; }
}
