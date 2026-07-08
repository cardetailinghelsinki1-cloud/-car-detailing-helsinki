# Työskentelytapa tässä repossa

- Käyttäjä haluaa kaikki muutokset suoraan livenä nettisivuille — ei luonnoksia,
  ei pull requesteja, ei erillistä lupaa mergelle.
- Push valmiit muutokset suoraan `main`-haaraan (fast-forward tai commit),
  älä jätä niitä pelkälle feature-branchille odottamaan mergeä.
- Sivusto julkaistaan automaattisesti (Vercel) kun `main` päivittyy, joten
  push `main`:iin = julkaisu tuotantoon muutaman minuutin viiveellä.
- Tämä on pysyvä ohje, ei kertaluontoinen lupa yhdelle muutokselle.
