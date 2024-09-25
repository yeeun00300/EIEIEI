export const mapLocaleToProvince = (locale) => {
  const gyeonggiCitiesAndCounties = [
    "용인시",
    "화성시",
    "수원시",
    "고양시",
    "부천시",
    "안양시",
    "안산시",
    "성남시",
    "시흥시",
    "광명시",
    "김포시",
    "의정부시",
    "파주시",
    "여주시",
    "양주시",
    "포천시",
    "이천시",
    "동두천시",
    "안성시",
    "오산시",
    "하남시",
    "구리시",
    "남양주시",
    "가평군",
    "양평군",
    "여주군",
    "평택시",
    "광주시",
    "부천시",
    "경기",
  ];

  const chungcheongNamdoCities = [
    "천안시",
    "아산시",
    "논산시",
    "계룡시",
    "공주시",
    "서산시",
    "보령시",
    "당진시",
    "태안군",
    "예산군",
    "홍성군",
    "청양군",
    "부여군",
    "서천군",
    "금산군",
    "아산군",
    "이전군",
    "청양군",
  ];

  const chungcheongBukdoCities = [
    "청주시",
    "충주시",
    "제천시",
    "보은군",
    "옥천군",
    "영동군",
    "진천군",
    "음성군",
    "괴산군",
    "증평군",
    "단양군",
    "서원구",
    "상당구",
    "흥덕구",
  ];

  const jeollaNamdoCities = [
    "광주광역시",
    "목포시",
    "여수시",
    "순천시",
    "나주시",
    "담양군",
    "장성군",
    "곡성군",
    "구례군",
    "고흥군",
    "보성군",
    "화순군",
    "신안군",
    "완도군",
    "진도군",
    "해남군",
    "영암군",
    "함평군",
  ];

  const jeollaBukdoCities = [
    "전주",
    "익산시",
    "군산시",
    "정읍시",
    "남원시",
    "김제시",
    "완주군",
    "진안군",
    "무주군",
    "장수군",
    "임실군",
    "순창군",
    "고창군",
    "부안군",
  ];

  const gyeongsangNamdoCities = [
    "부산광역시",
    "울산광역시",
    "경남",
    "창원시",
    "김해시",
    "양산시",
    "거제시",
    "진주시",
    "사천시",
    "밀양시",
    "함안군",
    "의령군",
    "창녕군",
    "고성군",
    "남해군",
    "하동군",
    "산청군",
    "함양군",
    "거창군",
    "합천군",
  ];

  const gyeongsangBukdoCities = [
    "대구광역시",
    "경북",
    "포항시",
    "경산시",
    "구미시",
    "영천시",
    "안동시",
    "상주시",
    "칠곡군",
    "고령군",
    "성주군",
    "청도군",
    "경산군",
    "문경시",
    "예천군",
    "영양군",
    "봉화군",
    "울진군",
    "울릉군",
    "영주군",
  ];

  const jejuIslandCities = ["제주특별자치도", "서귀포시", "제주시"];

  // 강원도 시 및 군 추가
  const gangwonCitiesAndCounties = [
    "춘천시",
    "원주시",
    "강릉시",
    "동해시",
    "태백시",
    "속초시",
    "삼척시",
    "홍천군",
    "횡성군",
    "영월군",
    "평창군",
    "정선군",
    "철원군",
    "화천군",
    "양구군",
    "인제군",
    "고성군",
    "양양군",
  ];

  if (gyeonggiCitiesAndCounties.includes(locale)) {
    return "경기도";
  } else if (chungcheongNamdoCities.includes(locale)) {
    return "충청남도";
  } else if (chungcheongBukdoCities.includes(locale)) {
    return "충청북도";
  } else if (jeollaNamdoCities.includes(locale)) {
    return "전라남도";
  } else if (jeollaBukdoCities.includes(locale)) {
    return "전라북도";
  } else if (gyeongsangNamdoCities.includes(locale)) {
    return "경상남도";
  } else if (gyeongsangBukdoCities.includes(locale)) {
    return "경상북도";
  } else if (jejuIslandCities.includes(locale)) {
    return "제주특별자치도";
  } else if (gangwonCitiesAndCounties.includes(locale)) {
    return "강원도";
  } else if (locale === "서울특별시") {
    return "서울특별시";
  } else if (locale === "부산광역시") {
    return "부산광역시";
  } else if (locale === "대구광역시") {
    return "대구광역시";
  } else if (locale === "대전광역시") {
    return "대전광역시";
  } else if (locale === "광주광역시") {
    return "광주광역시";
  } else if (locale === "울산광역시") {
    return "울산광역시";
  } else if (locale === "세종특별자치시") {
    return "세종특별자치시";
  } else if (locale === "인천광역시") {
    return "인천광역시";
  } else {
    return locale; // 해당하지 않으면 그대로 반환
  }
};
