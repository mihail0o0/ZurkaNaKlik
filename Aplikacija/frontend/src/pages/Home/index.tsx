import style from "./style.module.css";
import OglasKartica from "@/components/OglasKartica";
import HomeImage from "@/components/HomeImage";

const Home = () => {
  
  return (
    <div className={style.SearchGlavni}>
      <HomeImage />

      <div className={style.SearchKartice}>
        
        <OglasKartica
          nazivProstora="Vila Maria"
          slika="../public/images/slika-kartica-proba.jpg"
          tipProslave="zurka,proslava"
          isFavorite={false}
          prosecnaOcena="4,5"
          opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
          cena="120"
          brojLjudi="12"
          lokacija="Nis"
          onClick={() => {}}
        />
        <OglasKartica
          nazivProstora="Vila Maria"
          slika="slika"
          tipProslave="zurka,proslava"
          isFavorite={false}
          prosecnaOcena="4,5"
          opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
          cena="120"
          brojLjudi="12"
          lokacija="Nis"
          onClick={() => {}}
        />
        <OglasKartica
          nazivProstora="Vila Maria"
          slika="../public/images/slika-kartica-proba.jpg"
          tipProslave="zurka,proslava"
          isFavorite={true}
          prosecnaOcena="4,5"
          opis="Prelepa vikendica u blizini Nisa koja svakog posetioca ostavlja bez daha! Posetite nas i vidite zasto je bas nasa usluga najbolja"
          cena="120"
          brojLjudi="12"
          lokacija="Nis"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Home;
