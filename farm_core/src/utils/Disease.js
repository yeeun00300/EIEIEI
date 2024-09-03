export const cattle_diagnosis = [
  {
    diseaseName: "소 바이러스성 설사증 (Bovine Viral Diarrhea, BVD)",
    symptoms:
      "발열, 설사, 식욕 저하, 호흡기 문제, 임신 중 감염 시 유산, 사산, 태아 기형 발생 가능",
    diagnosisTool:
      "혈액, 타액 또는 분변 샘플을 이용한 RT-PCR 검사, 혈청검사를 통해 항체 유무 확인",
    therapy:
      "대증요법을 통한 증상 완화. 2차 감염 예방을 위한 항생제 증상투여, 감염 소의 영양 상태 관리",
  },
  {
    diseaseName: "구제역 (Foot-and-Mouth Disease, FMD)",
    symptoms: "고열, 입과 발굽의 물집, 침 흘림, 절뚝거림, 심한 경우 폐사",
    diagnosisTool: "RT-PCR 및 ELISA 검사, 바이러스 항원 및 항체 검출",
    therapy:
      "구제역은 법정전염병으로 치료보다는 전파 방지가 중요, 감염된 동물은 살처분이 원칙",
  },
  {
    diseaseName: "소 결핵 (Bovine Tuberculosis)",
    symptoms: "초기 증상은 거의 없음, 후기에는 기침, 체중 감소, 피로",
    diagnosisTool:
      "피부 결핵 검사 (Tuberculin skin test), 혈액 검사를 통한 세균 확인",
    therapy:
      "소 결핵은 치료보다는 감염 동물의 도태가 중요, 농장의 위생 및 방역 관리",
  },
  {
    diseaseName: "유방염 (Mastitis)",
    symptoms: "젖소의 젖이 붓고, 통증, 염증, 젖에서 혈액이나 고름이 나옴",
    diagnosisTool:
      "우유 샘플을 통한 세균 배양 검사, Somatic Cell Count (SCC) 측정",
    therapy: "항생제 치료, 젖소의 위생 관리 강화, 우유 생산 중단",
  },
  {
    diseaseName: "소 폐렴 (Bovine Pneumonia)",
    symptoms: "기침, 발열, 호흡 곤란, 폐에서 잡음",
    diagnosisTool: "임상 증상 관찰, 흉부 청진, 폐의 엑스레이 촬영",
    therapy: "항생제 투여, 소의 스트레스 관리, 농장의 환기 상태 개선",
  },
  {
    diseaseName: "야콥병 (Bovine Spongiform Encephalopathy, BSE)",
    symptoms: "신경계 증상, 운동 실조, 행동 이상, 거동 불편",
    diagnosisTool: "뇌 조직 검사 (사후), ELISA 또는 Western blot 분석",
    therapy: "치료 불가, 감염 소의 살처분 및 농장 격리",
  },
  {
    diseaseName: "소 파라티푸스 (Paratuberculosis, Johne's Disease)",
    symptoms: "만성 설사, 체중 감소, 식욕 저하, 면역력 저하",
    diagnosisTool: "분변 및 혈액 샘플을 통한 세균 배양, PCR 검사",
    therapy: "치료가 어려우며, 감염 동물의 도태 및 농장의 방역 관리",
  },
  {
    diseaseName: "블랙레그 (Blackleg)",
    symptoms: "급성 발병, 발열, 근육 부종, 조직 괴사, 급격한 폐사",
    diagnosisTool: "병변 부위의 조직 샘플 검사, 박테리아 배양",
    therapy: "항생제 치료 가능하나, 예방 접종이 최선의 방책",
  },
];

export const swine_diagnosis = [
  {
    diseaseName: "돼지 유행성 설사 (Porcine Epidemic Diarrhea, PED)",
    symptoms:
      "심한 수양성 설사, 구토, 탈수, 급격한 체중 감소, 어린 돼지에서 높은 폐사율",
    diagnosisTool: "RT-PCR 검사를 통한 바이러스 검출, 분변 샘플 분석",
    therapy: "대증 요법으로 수분 및 전해질 보충, 항생제를 통한 2차 감염 예방",
  },
  {
    diseaseName: "돼지 열병 (Classical Swine Fever, CSF)",
    symptoms: "고열, 설사, 구토, 붉은 반점, 경련, 폐사",
    diagnosisTool:
      "RT-PCR 및 ELISA 검사, 혈액, 분변, 조직 검사를 통한 바이러스 검출",
    therapy: "치료는 불가능하며 감염 동물은 살처분, 전파 방지를 위한 방역 강화",
  },
  {
    diseaseName: "아프리카돼지열병 (African Swine Fever, ASF)",
    symptoms: "고열, 피부에 자주색 반점, 출혈, 구토, 설사, 호흡 곤란 등",
    diagnosisTool: "현재 백신이나 치료제가 없으므로 감염에 각별히 주의해야 함",
    therapy: "백신과 치료제의 부제로 감염 시 살처분이 원칙",
  },
  {
    diseaseName:
      "돼지생식기호흡기증후군 (Porcine Reproductive and Respiratory Syndrome, PRRS)",
    symptoms: "호흡기 증상, 임신 돼지의 유산, 허약한 자돈 출산, 체중 감소",
    diagnosisTool: "혈액, 폐 조직 샘플을 통한 바이러스 분리 및 PCR 검사",
    therapy: "대증 요법과 2차 감염 예방을 위한 항생제 치료, 농장 위생 관리",
  },
  {
    diseaseName: "돼지콜레라 (Swine Cholera)",
    symptoms: "고열, 설사, 구토, 식욕 부진, 피부 출혈, 경련, 폐사",
    diagnosisTool: "혈액, 분변, 조직 샘플을 통한 바이러스 분리 및 PCR 검사",
    therapy: "치료법이 없으며, 감염 동물의 살처분 및 방역 조치 필요",
  },
  {
    diseaseName: "돈단독 (Erysipelas)",
    symptoms: "피부에 다이아몬드 모양의 발진, 고열, 관절염, 심한 경우 폐사",
    diagnosisTool: "혈액 및 피부 샘플을 통한 세균 배양, PCR 검사",
    therapy: "항생제 치료 가능, 예방 접종을 통한 관리가 중요",
  },
  {
    diseaseName: "회장염 (Ileitis)",
    symptoms: "설사, 체중 감소, 성장 지연, 혈변",
    diagnosisTool: "분변 샘플을 통한 세균 배양, PCR 검사",
    therapy: "항생제 치료, 사료 관리 및 위생 관리 강화",
  },
];

export const poultry_diagnosis = [
  {
    diseaseName: "뉴캐슬병 (Newcastle Disease, ND)",
    symptoms:
      "호흡기 문제, 기침, 재채기, 신경 증상: 경련, 마비, 급격한 산란율 감소",
    diagnosisTool: "RT-PCR 검사, 혈청학적 검사로 항체 확인",
    therapy:
      "바이러스성 질병으로 치료법은 없으며 예방이 최우선, 감염 시 살처분이 원칙",
  },
  {
    diseaseName: "가금티푸스 (Fowl Typhoid)",
    symptoms: "무기력, 식욕 부진, 탈수, 설사, 산란율 저하",
    diagnosisTool: "배설물 및 혈액 샘플 분석, 세균 배양 및 항생제 감수성 검사",
    therapy: "항생제 치료, 위생 및 환경 관리 강화",
  },
  {
    diseaseName: "조류 인플루엔자 (Avian Influenza, AI)",
    symptoms: "호흡 곤란, 기침, 재채기, 산란율 저하, 얼굴 부종, 심한 경우 폐사",
    diagnosisTool: "RT-PCR 및 ELISA 검사, 병변 조직 검사",
    therapy:
      "바이러스성 질병으로 치료법은 없으며 감염 시 살처분이 원칙, 방역과 예방이 중요",
  },
  {
    diseaseName: "가금 콕시듐증 (Avian Coccidiosis)",
    symptoms: "설사, 혈변, 체중 감소, 성장 지연, 산란율 저하",
    diagnosisTool: "분변 샘플을 통한 현미경 검사, 항생제 감수성 검사",
    therapy: "항콕시듐제를 통한 치료, 예방접종 및 사료 관리 강화",
  },
  {
    diseaseName: "전염성 기관지염 (Infectious Bronchitis, IB)",
    symptoms: "기침, 재채기, 호흡 곤란, 산란율 저하, 기형란 발생",
    diagnosisTool: "RT-PCR 검사, 바이러스 분리 및 항체 검사",
    therapy: "대증 요법으로 증상 완화, 항생제를 통한 2차 감염 예방",
  },
  {
    diseaseName: "마렉병 (Marek's Disease)",
    symptoms: "신경 마비, 날개 처짐, 다리 마비, 체중 감소",
    diagnosisTool: "현미경을 통한 조직 검사, 바이러스 분리 및 PCR 검사",
    therapy: "예방 접종이 최선의 방책, 감염 조류의 격리 및 도태",
  },
  {
    diseaseName: "가금콜레라 (Fowl Cholera)",
    symptoms: "발열, 식욕 저하, 설사, 폐사율 증가, 만성형은 관절염",
    diagnosisTool: "혈액 샘플을 통한 세균 배양, PCR 검사",
    therapy: "항생제 치료 가능하나, 예방 접종과 환경 관리가 중요",
  },
];
