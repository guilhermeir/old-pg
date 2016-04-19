var support = {}

support.getLocation = function(str) {
  if (str.match(/sao paulo/i)||str.match(/sp/i)||str.match(/são paulo/i)||str.match(/sampa/i)){
    return "sp";
  }
  if (str.match(/minas gerais/i)||str.match(/mg/i)){
    return "mg";
  }
  if (str.match(/rio de janeiro/i)||str.match(/rj/i)){
    return "rj";
  }
  if (str.match(/bahia/i)||str.match(/ba/i)){
    return "ba";
  }
  if (str.match(/rio grande do sul/i)||str.match(/rs/i)){
    return "rs";
  }
  if (str.match(/parana/i)||str.match(/pr/i)){
    return "pr";
  }
  if (str.match(/pernambuco/i)||str.match(/pe/i)){
    return "pe";
  }
  if (str.match(/ceara/i)||str.match(/ce/i)||str.match(/ceará/i)){
    return "ce";
  }
  if (str.match(/para/i)||str.match(/pa/i)||str.match(/pará/i)){
    return "pa";
  }
  if (str.match(/santa catarina/i)||str.match(/sc/i)){
    return "sc";
  }
  if (str.match(/maranhao/i)||str.match(/ma/i)||str.match(/maranhão/i)){
    return "ma";
  }
  if (str.match(/goias/i)||str.match(/go/i)||str.match(/goiás/i)){
    return "go";
  }
  if (str.match(/amazonas/i)||str.match(/am/i)||str.match(/amazonia/i)){
    return "am";
  }
  if (str.match(/paraiba/i)||str.match(/pb/i)||str.match(/paraíba/i)){
    return "pb";
  }
  if (str.match(/espirito santo/i)||str.match(/es/i)||str.match(/espírito santo/i)){
    return "es";
  }
  if (str.match(/rio grande do norte/i)||str.match(/rn/i)){
    return "rn";
  }
  if (str.match(/alagoas/i)||str.match(/al/i)){
    return "al";
  }
  if (str.match(/mato grosso/i)||str.match(/mt/i)){
    return "mt";
  }
  if (str.match(/piaui/i)||str.match(/pi/i)||str.match(/piauí/i)){
    return "pi";
  }
  if (str.match(/distrito federal/i)||str.match(/df/i)||str.match(/brasilia/i)||str.match(/brasília/i)){
    return "df";
  }
  if (str.match(/mato grosso do sul/i)||str.match(/ms/i)){
    return "ms";
  }
  if (str.match(/sergipe/i)||str.match(/se/i)){
    return "se";
  }
  if (str.match(/rondonia/i)||str.match(/ro/i)||str.match(/rondônia/i)){
    return "ro";
  }
  if (str.match(/tocantins/i)||str.match(/to/i)){
    return "to";
  }
  if (str.match(/acre/i)||str.match(/ac/i)){
    return "ac";
  }
  if (str.match(/amapa/i)||str.match(/ap/i)||str.match(/amapa/i)){
    return "ap";
  }
  if (str.match(/roraima/i)||str.match(/ra/i)){
    return "ra";
  }
  return null;
}

support.getUsefulData = function(tweet) {
  var data = {}

  data.text = tweet.text;
  data.inDegree = tweet.user.followers_count;
  data.outDegree = tweet.user.friends_count;
  data.retweet = tweet.retweet_count;
  data.lang = tweet.lang;
  data.userName = tweet.user.name;
  if(tweet.user.location){
    data.location = this.getLocation(tweet.user.location);
  } else {
    data.location = null;
  }

  return data;
}

module.exports = support;
