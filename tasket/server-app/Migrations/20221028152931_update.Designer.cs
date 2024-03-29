﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server_app.Models.EDM;

namespace server_app.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20221028152931_update")]
    partial class update
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("server_app.Models.EDM.t_task", b =>
                {
                    b.Property<Guid>("id_task")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("description")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("end_date_actual")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("end_date_scheduled")
                        .HasColumnType("TEXT");

                    b.Property<bool>("is_finish")
                        .HasColumnType("INTEGER");

                    b.Property<string>("title")
                        .HasColumnType("TEXT");

                    b.HasKey("id_task");

                    b.ToTable("t_tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
