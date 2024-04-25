﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebTemplate.Models;

#nullable disable

namespace WebTemplate.Migrations
{
    [DbContext(typeof(ZurkaNaKlikDbContext))]
    [Migration("20240425205427_v3")]
    partial class v3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("KorisnikOglasObjekta", b =>
                {
                    b.Property<int>("ListaKorisnikaKojimaJeOmiljeniOglasId")
                        .HasColumnType("int");

                    b.Property<int>("ListaOmiljenihOglasaObjekataId")
                        .HasColumnType("int");

                    b.HasKey("ListaKorisnikaKojimaJeOmiljeniOglasId", "ListaOmiljenihOglasaObjekataId");

                    b.HasIndex("ListaOmiljenihOglasaObjekataId");

                    b.ToTable("KorisnikOglasObjekta");
                });

            modelBuilder.Entity("backend.Models.KorisnikAgencija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BrTel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(21)
                        .HasColumnType("nvarchar(21)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lokacija")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LozinkaHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int")
                        .HasColumnName("Role");

                    b.Property<string>("SlikaProfila")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("KorisnikAgencijas");

                    b.HasDiscriminator<string>("Discriminator").HasValue("KorisnikAgencija");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("backend.Models.OglasObjekta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BrTel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("BrojKreveta")
                        .HasColumnType("int");

                    b.Property<int>("BrojKupatila")
                        .HasColumnType("int");

                    b.Property<int>("BrojOcena")
                        .HasColumnType("int");

                    b.Property<int>("BrojSoba")
                        .HasColumnType("int");

                    b.Property<int>("CenaPoDanu")
                        .HasColumnType("int");

                    b.Property<string>("Grad")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Grejanje")
                        .HasColumnType("int");

                    b.Property<int>("Kvadratura")
                        .HasColumnType("int");

                    b.Property<string>("ListDodatneOpreme")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ListaTipProslava")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ListaTipProstora")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lokacija")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Ocena")
                        .HasColumnType("int");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slike")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("VlasnikOglasaId")
                        .HasColumnType("int");

                    b.Property<string>("ZauzetiDani")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("VlasnikOglasaId");

                    b.ToTable("OglasObjektas");
                });

            modelBuilder.Entity("backend.Models.ZakupljeniOglas", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DatumZakupa")
                        .HasColumnType("datetime2");

                    b.Property<int>("KorisnikId")
                        .HasColumnType("int");

                    b.Property<int>("OglasId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ZakupljenDo")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ZakupljenOd")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("KorisnikId");

                    b.HasIndex("OglasId");

                    b.ToTable("ZakupljeniOglas");
                });

            modelBuilder.Entity("backend.Models.Agencija", b =>
                {
                    b.HasBaseType("backend.Models.KorisnikAgencija");

                    b.Property<int>("BrojOcena")
                        .HasColumnType("int");

                    b.Property<int?>("Ocena")
                        .HasColumnType("int");

                    b.Property<string>("Opis")
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Agencija");
                });

            modelBuilder.Entity("backend.Models.Korisnik", b =>
                {
                    b.HasBaseType("backend.Models.KorisnikAgencija");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasDiscriminator().HasValue("Korisnik");
                });

            modelBuilder.Entity("KorisnikOglasObjekta", b =>
                {
                    b.HasOne("backend.Models.Korisnik", null)
                        .WithMany()
                        .HasForeignKey("ListaKorisnikaKojimaJeOmiljeniOglasId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.OglasObjekta", null)
                        .WithMany()
                        .HasForeignKey("ListaOmiljenihOglasaObjekataId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.OglasObjekta", b =>
                {
                    b.HasOne("backend.Models.Korisnik", "VlasnikOglasa")
                        .WithMany("ListaObjavljenihOglasaObjekta")
                        .HasForeignKey("VlasnikOglasaId");

                    b.Navigation("VlasnikOglasa");
                });

            modelBuilder.Entity("backend.Models.ZakupljeniOglas", b =>
                {
                    b.HasOne("backend.Models.Korisnik", "Korisnik")
                        .WithMany("ListaZakupljenihOglasa")
                        .HasForeignKey("KorisnikId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.OglasObjekta", "Oglas")
                        .WithMany()
                        .HasForeignKey("OglasId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Korisnik");

                    b.Navigation("Oglas");
                });

            modelBuilder.Entity("backend.Models.Korisnik", b =>
                {
                    b.Navigation("ListaObjavljenihOglasaObjekta");

                    b.Navigation("ListaZakupljenihOglasa");
                });
#pragma warning restore 612, 618
        }
    }
}
