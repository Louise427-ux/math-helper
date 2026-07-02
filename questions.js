// ============================================================
// 【题目数据】以后用 ChatGPT/通义 生成的 JSON 替换下面整个数组
// 每道题记得加上 image 字段，指向 images 文件夹里的截图
// ============================================================
const questionsData = [
  {
    "id": "q1",
    "title": "长方形纸片折叠求角",
    "tag": "几何折叠",
    "level": "中等",
    "image": "images/q1.png",
    "problem": "如图，在长方形纸片 ABCD 中，AB∥CD，点 E、F 分别在边 AB、CD 上，将纸片沿 EF 折叠，A、D 两点的对应点分别为 A₁、D₁。若 ∠1 = 2∠2，则 ∠3 的度数是（ ）\nA. 36°    B. 60°    C. 72°    D. 108°",
    "steps": [
      {
        "type": "choice",
        "question": "沿 EF 折叠后，点 D 的对应点是 D₁。下面哪一组线段是折叠前后的对应线段？",
        "options": [
          { "text": "FD 和 FD₁", "feedback": "正确。D 折到 D₁，F 在折痕上不动，所以 FD 的对应线段是 FD₁。" },
          { "text": "FC 和 FD₁", "feedback": "不要只看线段离得近不近，要根据【折叠前后的对应点】判断对应线段。" },
          { "text": "EF 和 FD₁", "feedback": "不要只看线段离得近不近，要根据【折叠前后的对应点】判断对应线段。" }
        ],
        "correctIndex": 0,
        "skillTag": "折叠对应线段识别",
        "priority": 5,
        "hints": [
          "先找题干中明确说的对应点：D 的对应点是 D₁。",
          "点 F 在折痕 EF 上，折叠时点 F 不动。",
          "所以线段 FD 折叠后对应线段 FD₁。"
        ],
        "remedialQuestion": "观察原图，沿 EF 折叠后，线段 FD 的对应线段是（ ）",
        "remedialOptions": ["FC", "FD₁", "EA₁"],
        "remedialCorrectIndex": 1,
        "remedialAnswer": "FD₁",
        "remedialExplanation": "点 D 的对应点是 D₁，点 F 在折痕 EF 上不动，所以 FD 折叠后的对应线段是 FD₁。"
      },
      {
        "type": "choice",
        "question": "根据折叠性质，下面哪个角相等关系正确？",
        "options": [
          { "text": "∠DFE = ∠EFD₁", "feedback": "正确。由折叠可得 ∠DFE = ∠EFD₁。" },
          { "text": "∠1 = ∠2", "feedback": "折叠中的等角要看【哪条边折到哪条边】，不能直接认为图上标得近的角就相等。" },
          { "text": "∠3 = ∠2", "feedback": "折叠中的等角要看【哪条边折到哪条边】，不能直接认为图上标得近的角就相等。" }
        ],
        "correctIndex": 0,
        "skillTag": "折叠对应角识别",
        "priority": 5,
        "hints": [
          "FD 折叠后对应 FD₁。",
          "EF 是折痕，折叠前后都在同一条线上。",
          "所以 FD 与 EF 形成的角，等于 EF 与 FD₁ 形成的角。"
        ],
        "remedialQuestion": "观察原图，根据折叠性质，下列角相等关系正确的是（ ）",
        "remedialOptions": ["∠DFE = ∠EFD₁", "∠1 = ∠2", "∠3 = ∠2"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "∠DFE = ∠EFD₁",
        "remedialExplanation": "FD 折叠后对应 FD₁，EF 是折痕，所以 FD 与 EF 的夹角等于 EF 与 FD₁ 的夹角，即 ∠DFE = ∠EFD₁。"
      },
      {
        "type": "choice",
        "question": "结合图形，∠DFE 和 ∠EFD₁ 分别可以表示为（ ）",
        "options": [
          { "text": "∠DFE = 180°－∠1，∠EFD₁ = ∠1＋∠2", "feedback": "正确。∠DFE = 180°－∠1，∠EFD₁ = ∠1＋∠2。" },
          { "text": "∠DFE = ∠1，∠EFD₁ = ∠2", "feedback": "这里要把没有直接标出来的大角，用图中已经标出的 ∠1、∠2 表示出来。" },
          { "text": "∠DFE = 180°－∠2，∠EFD₁ = ∠1－∠2", "feedback": "这里要把没有直接标出来的大角，用图中已经标出的 ∠1、∠2 表示出来。" }
        ],
        "correctIndex": 0,
        "skillTag": "角关系转化",
        "priority": 5,
        "hints": [
          "D、F、C 三点共线，所以 FD 和 FC 组成一条直线。",
          "因此 ∠DFE 和 ∠1 合起来是 180°。",
          "从 FE 转到 FD₁，要经过 ∠1 和 ∠2，所以 ∠EFD₁ = ∠1＋∠2。"
        ],
        "remedialQuestion": "观察原图，D、F、C 三点共线，则 ∠DFE 可以表示为（ ）",
        "remedialOptions": ["∠1", "180°－∠1", "∠1＋∠2"],
        "remedialCorrectIndex": 1,
        "remedialAnswer": "180°－∠1",
        "remedialExplanation": "FD 和 FC 是相反方向的射线，∠DFE 与 ∠1 组成平角，所以 ∠DFE = 180°－∠1。"
      },
      {
        "type": "input",
        "question": "由折叠可得 180°－∠1 = ∠1＋∠2，又知 ∠1 = 2∠2。求 ∠1 的度数。",
        "acceptedAnswers": ["72", "72°", "72度"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确。∠2 = 36°，所以 ∠1 = 72°。",
        "feedbackWrong": "注意要把 ∠1 = 2∠2 代入等式 180°－∠1 = ∠1＋∠2。",
        "skillTag": "列方程求角",
        "priority": 4,
        "hints": [
          "可以设 ∠2 = x，则 ∠1 = 2x。",
          "代入：180°－2x = 2x＋x。",
          "解得 x = 36°，所以 ∠1 = 72°。"
        ],
        "remedialQuestion": "若 180°－∠1 = ∠1＋∠2，且 ∠1 = 2∠2，则 ∠1 =（ ）",
        "remedialOptions": ["36°", "72°", "108°"],
        "remedialCorrectIndex": 1,
        "remedialAnswer": "72°",
        "remedialExplanation": "设 ∠2 = x，则 ∠1 = 2x。代入得 180°－2x = 3x，所以 x = 36°，∠1 = 72°。"
      },
      {
        "type": "choice",
        "question": "因为 AB∥CD，EF 是截线，所以 ∠3 与哪个角相等？",
        "options": [
          { "text": "∠1", "feedback": "正确。∠3 = ∠1 = 72°，所以选 C。" },
          { "text": "∠2", "feedback": "最后一步要用 AB∥CD，把 F 点处的 ∠1 转移到 E 点处的 ∠3。" },
          { "text": "∠1＋∠2", "feedback": "最后一步要用 AB∥CD，把 F 点处的 ∠1 转移到 E 点处的 ∠3。" }
        ],
        "correctIndex": 0,
        "skillTag": "平行线角关系迁移",
        "priority": 5,
        "hints": [
          "∠3 是 AE 与 EF 形成的角。",
          "∠1 是 EF 与 FC 形成的角。",
          "因为 AB∥CD，所以 AE 所在直线与 FC 所在直线平行，因此 ∠3 = ∠1。"
        ],
        "remedialQuestion": "观察原图，若已经求出 ∠1 = 72°，又因为 AB∥CD，则 ∠3 =（ ）",
        "remedialOptions": ["36°", "72°", "108°"],
        "remedialCorrectIndex": 1,
        "remedialAnswer": "72°",
        "remedialExplanation": "因为 AB∥CD，EF 是截线，所以 ∠3 = ∠1。已知 ∠1 = 72°，所以 ∠3 = 72°。"
      }
    ]
  },
  {
    "id": "q2",
    "title": "垂直平分线性质求三角形周长",
    "tag": "尺规作图与垂直平分线",
    "level": "中等",
    "image": "images/q2.png",
    "problem": "如图，在 △ABC 中，分别以 A、C 为圆心，大于 1/2 AC 长为半径作弧，两弧分别相交于 M、N 两点，作直线 MN，分别交线段 BC、AC 于点 D、E。若 AE = 3cm，△ABD 的周长为 10cm，则 △ABC 的周长为（ ）\nA. 13cm    B. 14cm    C. 15cm    D. 16cm",
    "steps": [
      {
        "type": "choice",
        "question": "题中【分别以 A、C 为圆心，大于 1/2 AC 长为半径作弧，两弧交于 M、N，作直线 MN】，这一步作出的 MN 是什么？",
        "options": [
          { "text": "AC 的垂直平分线", "feedback": "正确。MN 是 AC 的垂直平分线。" },
          { "text": "BC 的垂直平分线", "feedback": "这里不是在作角平分线，而是以 A、C 为圆心作弧，所以得到的是 AC 的垂直平分线。" },
          { "text": "∠A 的角平分线", "feedback": "这里不是在作角平分线，而是以 A、C 为圆心作弧，所以得到的是 AC 的垂直平分线。" }
        ],
        "correctIndex": 0,
        "skillTag": "尺规作图识别",
        "priority": 5,
        "hints": [
          "以线段两个端点为圆心，用相同半径作弧，是常见的尺规作图。",
          "两弧交点连线通常用来作原线段的垂直平分线。",
          "这里两个圆心是 A 和 C，所以作出的是 AC 的垂直平分线。"
        ],
        "remedialQuestion": "观察原图，直线 MN 是通过【分别以 A、C 为圆心，用相同半径作弧】得到的。MN 是（ ）",
        "remedialOptions": ["AC 的垂直平分线", "AB 的垂直平分线", "∠C 的角平分线"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "AC 的垂直平分线",
        "remedialExplanation": "分别以线段 AC 的两个端点 A、C 为圆心，用相同半径作弧，两弧交点连线 MN 就是 AC 的垂直平分线。"
      },
      {
        "type": "choice",
        "question": "因为 MN 是 AC 的垂直平分线，且 MN 交 AC 于 E，已知 AE = 3cm，则 AC =（ ）",
        "options": [
          { "text": "3cm", "feedback": "AE 只是 AC 的一半，不是整条 AC。" },
          { "text": "6cm", "feedback": "正确。E 是 AC 的中点，AE = 3cm，所以 AC = 6cm。" },
          { "text": "10cm", "feedback": "AE 只是 AC 的一半，不是整条 AC。" }
        ],
        "correctIndex": 1,
        "skillTag": "垂直平分线与中点关系",
        "priority": 4,
        "hints": [
          "垂直平分线会经过线段的中点。",
          "所以 E 是 AC 的中点。",
          "因此 AC = 2AE。"
        ],
        "remedialQuestion": "观察原图，若 E 是 AC 的中点，且 AE = 3cm，则 AC =（ ）",
        "remedialOptions": ["3cm", "6cm", "9cm"],
        "remedialCorrectIndex": 1,
        "remedialAnswer": "6cm",
        "remedialExplanation": "E 是 AC 的中点，所以 AE = EC，AC = 2AE = 2×3 = 6cm。"
      },
      {
        "type": "choice",
        "question": "因为 D 在 AC 的垂直平分线 MN 上，所以可以得到（ ）",
        "options": [
          { "text": "AD = CD", "feedback": "正确。D 在 AC 的垂直平分线上，所以 AD = CD。" },
          { "text": "AD = BD", "feedback": "垂直平分线性质比较的是到线段两个端点 A、C 的距离，不是随便两条线段相等。" },
          { "text": "BD = CD", "feedback": "垂直平分线性质比较的是到线段两个端点 A、C 的距离，不是随便两条线段相等。" }
        ],
        "correctIndex": 0,
        "skillTag": "垂直平分线性质",
        "priority": 5,
        "hints": [
          "垂直平分线上的点，到线段两个端点的距离相等。",
          "这里线段的两个端点是 A 和 C。",
          "D 在 MN 上，所以 DA = DC。"
        ],
        "remedialQuestion": "观察原图，D 在 AC 的垂直平分线 MN 上，所以一定有（ ）",
        "remedialOptions": ["AD = CD", "AD = BD", "AB = CD"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "AD = CD",
        "remedialExplanation": "垂直平分线上的点，到线段两个端点的距离相等。D 在 AC 的垂直平分线上，所以 AD = CD。"
      },
      {
        "type": "choice",
        "question": "已知 △ABD 的周长为 10cm，即 AB + BD + AD = 10cm。结合 AD = CD，下面哪个转化正确？",
        "options": [
          { "text": "AB + BD + AD = AB + BC", "feedback": "正确。AB + BD + AD = AB + BD + CD = AB + BC。" },
          { "text": "AB + BD + AD = AC", "feedback": "关键是把 AD 换成 CD，再和 BD 拼成 BC。" },
          { "text": "AB + BD + AD = AB + AC", "feedback": "关键是把 AD 换成 CD，再和 BD 拼成 BC。" }
        ],
        "correctIndex": 0,
        "skillTag": "周长关系转化",
        "priority": 5,
        "hints": [
          "因为 D 在线段 BC 上，所以 BC = BD + DC。",
          "又因为 AD = CD。",
          "所以 BD + AD = BD + CD = BC。"
        ],
        "remedialQuestion": "观察原图，若 AD = CD，且 D 在线段 BC 上，则 AB + BD + AD 可以转化为（ ）",
        "remedialOptions": ["AB + BC", "AC + BC", "AB + AC"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "AB + BC",
        "remedialExplanation": "AD 可以换成 CD，所以 AB + BD + AD = AB + BD + CD = AB + BC。"
      },
      {
        "type": "choice",
        "question": "已知 AB + BC = 10cm，AC = 6cm，则 △ABC 的周长是（ ）",
        "options": [
          { "text": "13cm", "feedback": "不要把 10cm 当作 △ABC 的周长，10cm 是 △ABD 的周长，最后还要加上 AC。" },
          { "text": "15cm", "feedback": "不要把 10cm 当作 △ABC 的周长，10cm 是 △ABD 的周长，最后还要加上 AC。" },
          { "text": "16cm", "feedback": "正确。△ABC 的周长 = AB + BC + AC = 10 + 6 = 16cm，选 D。" }
        ],
        "correctIndex": 2,
        "skillTag": "三角形周长计算",
        "priority": 4,
        "hints": [
          "△ABC 的周长是 AB + BC + AC。",
          "前面已经得到 AB + BC = 10cm。",
          "又 AC = 6cm，所以周长为 10 + 6。"
        ],
        "remedialQuestion": "观察原图，若 △ABD 的周长为 10cm，且 AC = 6cm，则 △ABC 的周长为（ ）",
        "remedialOptions": ["14cm", "15cm", "16cm"],
        "remedialCorrectIndex": 2,
        "remedialAnswer": "16cm",
        "remedialExplanation": "△ABD 的周长 AB + BD + AD = AB + BC = 10cm，所以 △ABC 的周长 = AB + BC + AC = 10 + 6 = 16cm。"
      }
    ]
  },
  {
    "id": "q4",
    "title": "平行线辅助线求角",
    "tag": "平行线角关系",
    "level": "中等",
    "image": "images/q4.png",
    "problem": "如图，已知 AB∥DE，∠1 = 20°，∠2 = ∠C，则 ∠C 的度数为________。",
    "steps": [
      {
        "stepTitle": "确定解题突破口",
        "type": "choice",
        "question": "已知 AB∥DE，要想把 B 点和 D 点的角转移到 C 点附近研究，过点 C 最适合作哪条辅助线？",
        "options": [
          { "text": "过点 C 作直线 l，使 l∥AB∥DE", "feedback": "正确。过点 C 作 l∥AB∥DE，是这道题的关键辅助线。" },
          { "text": "过点 C 作 BC 的垂线", "feedback": "这题的关键不是连线或作垂线，而是利用 AB∥DE 作一条过 C 的平行辅助线。" },
          { "text": "连接 B、D", "feedback": "这题的关键不是连线或作垂线，而是利用 AB∥DE 作一条过 C 的平行辅助线。" }
        ],
        "correctIndex": 0,
        "skillTag": "辅助线意识",
        "priority": 5,
        "hints": [
          "题目中最重要的条件是 AB∥DE。",
          "平行线条件常常需要通过作平行辅助线，把分散的角集中到同一个点附近。",
          "过 C 作 l∥AB∥DE 后，就可以把 ∠1 和 ∠2 转移到 C 点附近分析。"
        ],
        "stepSummary": "过点 C 作 l∥AB∥DE，把 B、D 两处的角转移到 C 点附近。",
        "remedialQuestion": "观察原图，若想利用 AB∥DE 解决这道题，过点 C 最适合补画哪条线？",
        "remedialOptions": ["过点 C 作直线 l∥AB∥DE", "过点 C 作 AB 的垂线", "连接 B、D"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "过点 C 作直线 l∥AB∥DE",
        "remedialExplanation": "题目给出 AB∥DE，最自然的辅助线是过 C 再作一条与它们平行的直线，这样可以把分散在 B、D 两处的角转移到 C 点附近。",
        "remedialImage": "images/q4.png"
      },
      {
        "stepTitle": "把 ∠1 转移到 C 点附近",
        "type": "choice",
        "question": "过点 C 作直线 l，使 l∥AB∥DE。由 ∠1 = 20°，可以得到 C 点左上方由 CB 与 l 形成的小角是（ ）",
        "options": [
          { "text": "20°", "feedback": "正确。由 l∥AB 可知，C 点左上方由 CB 与 l 形成的小角等于 ∠1，即 20°。" },
          { "text": "∠C", "feedback": "注意这里是把 B 点处的 ∠1 通过平行线转移到 C 点附近。" },
          { "text": "160°", "feedback": "注意这里是把 B 点处的 ∠1 通过平行线转移到 C 点附近。" }
        ],
        "correctIndex": 0,
        "skillTag": "平行线角关系",
        "priority": 5,
        "hints": [
          "l∥AB。",
          "BC 是截线。",
          "所以 AB 与 BC 形成的 ∠1，可以转移为 C 点处 CB 与 l 形成的小角。"
        ],
        "stepSummary": "由 l∥AB，可得 C 点左上方由 CB 与 l 形成的小角等于 ∠1，即 20°。",
        "remedialQuestion": "若过点 C 作直线 l∥AB，则由 ∠1 = 20° 可得 C 点左上方由 CB 与 l 形成的小角是（ ）",
        "remedialOptions": ["20°", "∠2", "160°"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "20°",
        "remedialExplanation": "因为 l∥AB，BC 是截线，所以 B 点处的 ∠1 可以转移到 C 点左上方，对应角等于 20°。",
        "remedialImage": "images/q4.png"
      },
      {
        "stepTitle": "判断 ∠2 转移后的关系",
        "type": "choice",
        "question": "过点 C 作直线 l，使 l∥AB∥DE。由平行线关系，C 点左下方由 l 与 CD 形成的小角应表示为（ ）",
        "options": [
          { "text": "180°－∠2", "feedback": "正确。C 点左下方由 l 与 CD 形成的小角是 180°－∠2。" },
          { "text": "∠2", "feedback": "这里不能把 C 点左下方的小角直接看成 ∠2。它和 ∠2 是同旁内角，二者互补。" },
          { "text": "20°＋∠2", "feedback": "这里不能把 C 点左下方的小角直接看成 ∠2。它和 ∠2 是同旁内角，二者互补。" }
        ],
        "correctIndex": 0,
        "skillTag": "平行线角关系迁移",
        "priority": 5,
        "hints": [
          "∠2 是 D 点处由 DE 与 DC 形成的角。",
          "l∥DE，CD 是截线。",
          "拼进 ∠C 的是 C 点左下方的小角，它与 ∠2 是同旁内角关系，和为 180°。"
        ],
        "stepSummary": "由 l∥DE 可知，C 点左下方由 l 与 CD 形成的小角与 ∠2 互补，所以它等于 180°－∠2。",
        "remedialQuestion": "观察原图，过点 C 作 l∥DE 后，C 点左下方由 l 与 CD 形成的小角与 ∠2 的关系是（ ）",
        "remedialOptions": ["它等于 180°－∠2", "它等于 ∠2", "它等于 20°＋∠2"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "180°－∠2",
        "remedialExplanation": "因为 l∥DE，CD 是截线。C 点左下方的小角与 D 点处的 ∠2 是同旁内角，二者和为 180°，所以这个小角等于 180°－∠2。",
        "remedialImage": "images/q4.png"
      },
      {
        "stepTitle": "建立 ∠C 的表达式",
        "type": "choice",
        "question": "过点 C 作直线 l∥AB∥DE 后，∠C 由 C 点左上方的 20° 和左下方的 180°－∠2 组成。下面哪个等式正确？",
        "options": [
          { "text": "∠C = 20° + (180°－∠2)", "feedback": "正确。∠C = 20° + (180°－∠2)。" },
          { "text": "20° + ∠C + ∠2 = 180°", "feedback": "这里不能写成 20° + ∠C + ∠2 = 180°。∠2 转移到 C 点附近时，拼进 ∠C 的是它的补角 180°－∠2。" },
          { "text": "∠C = 20° + ∠2", "feedback": "这里不能写成 20° + ∠C + ∠2 = 180°。∠2 转移到 C 点附近时，拼进 ∠C 的是它的补角 180°－∠2。" }
        ],
        "correctIndex": 0,
        "skillTag": "辅助线后的角关系转化",
        "priority": 5,
        "hints": [
          "C 点左上方的小角等于 20°。",
          "C 点左下方的小角等于 180°－∠2。",
          "∠C 是由这两个小角相加得到的。"
        ],
        "stepSummary": "∠C 由两个部分组成：左上方的 20°，以及左下方的 180°－∠2，所以 ∠C = 20° + (180°－∠2)。",
        "remedialQuestion": "若 C 点左上方小角为 20°，C 点左下方小角为 180°－∠2，则 ∠C 可以表示为（ ）",
        "remedialOptions": ["20° + (180°－∠2)", "20° + ∠2", "180°－20°－∠2"],
        "remedialCorrectIndex": 0,
        "remedialAnswer": "20° + (180°－∠2)",
        "remedialExplanation": "∠C 是由 C 点左上方和左下方两个小角拼成的，所以 ∠C = 20° + (180°－∠2)。",
        "remedialImage": "images/q4.png"
      },
      {
        "stepTitle": "代入 ∠2 = ∠C 求角度",
        "type": "input",
        "question": "已知 ∠C = 20° + (180°－∠2)，且 ∠2 = ∠C。求 ∠C 的度数。",
        "acceptedAnswers": ["100", "100°", "100度"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确。∠C = 100°。",
        "feedbackWrong": "注意这里不是 20° + 2x = 180°，而是 x = 20° + 180°－x。",
        "skillTag": "等量代换与方程求角",
        "priority": 5,
        "hints": [
          "可以设 ∠C = x。",
          "因为 ∠2 = ∠C，所以 ∠2 也可以表示为 x。",
          "代入得到 x = 20° + 180°－x，解得 2x = 200°，所以 x = 100°。"
        ],
        "stepSummary": "设 ∠C = x，因为 ∠2 = ∠C，所以 ∠2 = x。代入 x = 20° + 180°－x，解得 x = 100°。",
        "remedialQuestion": "若 x = 20° + (180°－x)，则 x =（ ）",
        "remedialOptions": ["80°", "100°", "120°"],
        "remedialCorrectIndex": 1,
        "remedialAnswer": "100°",
        "remedialExplanation": "x = 20° + 180°－x，即 x = 200°－x，所以 2x = 200°，x = 100°。",
        "remedialImage": "images/q4.png"
      }
    ]
  }
];
// ============================================================
// 【题目数据结束】
// ============================================================
