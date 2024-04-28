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
    [Migration("20240428212906_v1")]
    partial class v1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("KorisnikOglasObjekta", b =>
                {
                    b.Property<int>("ListaKorisnikaOmiljeniOglasId")
                        .HasColumnType("int");

                    b.Property<int>("ListaOmiljenihOglasaObjekataId")
                        .HasColumnType("int");

                    b.HasKey("ListaKorisnikaOmiljeniOglasId", "ListaOmiljenihOglasaObjekataId");

                    b.HasIndex("ListaOmiljenihOglasaObjekataId");

                    b.ToTable("KorisnikOglasObjekta");
                });

            modelBuilder.Entity("backend.Models.Kategorija", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AgencijaId")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AgencijaId");

                    b.ToTable("Kategorijas");
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

            modelBuilder.Entity("backend.Models.MeniKeteringa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CenaMenija")
                        .HasColumnType("int");

                    b.Property<int?>("KategorijaId")
                        .HasColumnType("int");

                    b.Property<string>("Naslov")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Slika")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StavkeJela")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ZahtevZaKeteringId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KategorijaId");

                    b.HasIndex("ZahtevZaKeteringId");

                    b.ToTable("MeniKeteringas");
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

            modelBuilder.Entity("backend.Models.ZahtevZaKetering", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DatumRezervacije")
                        .HasColumnType("datetime2");

                    b.Property<bool>("StatusRezervacije")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("ZahtevZaKeterings");
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

                    b.Property<int?>("ZakupljeniOglas")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("KorisnikId");

                    b.HasIndex("OglasId");

                    b.HasIndex("ZakupljeniOglas")
                        .IsUnique()
                        .HasFilter("[ZakupljeniOglas] IS NOT NULL");

                    b.ToTable("ZakupljeniOglasi");
                });

            modelBuilder.Entity("backend.Models.Agencija", b =>
                {
                    b.HasBaseType("backend.Models.KorisnikAgencija");

                    b.Property<int>("BrojOcena")
                        .HasColumnType("int");

                    b.Property<int>("CenaDostave")
                        .HasColumnType("int");

                    b.Property<bool>("MogucnostDostave")
                        .HasColumnType("bit");

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
                        .HasForeignKey("ListaKorisnikaOmiljeniOglasId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.OglasObjekta", null)
                        .WithMany()
                        .HasForeignKey("ListaOmiljenihOglasaObjekataId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Kategorija", b =>
                {
                    b.HasOne("backend.Models.Agencija", "Agencija")
                        .WithMany("KategorijeMenija")
                        .HasForeignKey("AgencijaId");

                    b.Navigation("Agencija");
                });

            modelBuilder.Entity("backend.Models.MeniKeteringa", b =>
                {
                    b.HasOne("backend.Models.Kategorija", "Kategorija")
                        .WithMany("ListaMenija")
                        .HasForeignKey("KategorijaId");

                    b.HasOne("backend.Models.ZahtevZaKetering", null)
                        .WithMany("ZakupljeniMeniji")
                        .HasForeignKey("ZahtevZaKeteringId");

                    b.Navigation("Kategorija");
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

                    b.HasOne("backend.Models.ZahtevZaKetering", "ZahtevZaKetering")
                        .WithOne("ZakupljeniOglas")
                        .HasForeignKey("backend.Models.ZakupljeniOglas", "ZakupljeniOglas");

                    b.Navigation("Korisnik");

                    b.Navigation("Oglas");

                    b.Navigation("ZahtevZaKetering");
                });

            modelBuilder.Entity("backend.Models.Kategorija", b =>
                {
                    b.Navigation("ListaMenija");
                });

            modelBuilder.Entity("backend.Models.ZahtevZaKetering", b =>
                {
                    b.Navigation("ZakupljeniMeniji");

                    b.Navigation("ZakupljeniOglas")
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Agencija", b =>
                {
                    b.Navigation("KategorijeMenija");
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
