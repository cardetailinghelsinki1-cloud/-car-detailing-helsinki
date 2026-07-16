# Työskentelytapa tässä repossa

- Käyttäjä haluaa kaikki muutokset suoraan livenä nettisivuille — ei luonnoksia,
  ei pull requesteja, ei erillistä lupaa mergelle.
- Push valmiit muutokset suoraan `main`-haaraan (fast-forward tai commit),
  älä jätä niitä pelkälle feature-branchille odottamaan mergeä.
- Sivusto julkaistaan automaattisesti (Vercel) kun `main` päivittyy, joten
  push `main`:iin = julkaisu tuotantoon muutaman minuutin viiveellä.
- Tämä on pysyvä ohje, ei kertaluontoinen lupa yhdelle muutokselle.

# Testitiedostot (Google Drive, Sheets, yms. ulkoiset työkalut)

- Vältä test-/scratch-tiedostojen luomista ulkoisiin palveluihin (esim. Google
  Drive/Sheets) aina kun se on mahdollista — esim. tarkista kaava-/formaattikysymykset
  ensin pienellä paikallisella simulaatiolla tai muulla tavalla ilman, että luot
  ylimääräisiä tiedostoja käyttäjän Driveen.
- Jos testitiedostojen luominen on välttämätöntä (esim. selvittää jonkin ulkoisen
  palvelun käyttäytymistä), siivoa ne pois heti kun lopullinen tiedosto on valmis.
- Jos käytettävissä ei ole poisto-työkalua kyseiselle palvelulle, kerro käyttäjälle
  suoraan mitkä tiedostot jäivät roskaksi ja että ne pitää poistaa käsin — älä jätä
  tätä mainitsematta.
