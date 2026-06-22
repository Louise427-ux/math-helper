// ============================================================
// 【题目数据】以后用 ChatGPT/通义 生成的 JSON 替换下面整个数组
// 每道题记得加上 image 字段，指向 images 文件夹里的截图
// ============================================================
const questionsData = [
  {
    "id": "q1",
    "title": "折叠中的角度关系",
    "tag": "几何折叠",
    "level": "易错",
    "image": "images/q1.png",
    "problem": "如图，在长方形片ABCD中，AB∥CD，点E、F分别在边AB、CD上，将纸片沿EF折叠，A、D两点的对应点分别为A₁、D₁。若∠1＝2∠2，则∠3的度数是（ ） A.36° B.60° C.72° D.108°",
    "steps": [
      {
        "type": "choice",
        "question": "题目中的折叠轴是哪一条线？",
        "options": [
          { "text": "EF", "feedback": "正确，纸片是沿EF折叠的。" },
          { "text": "AB", "feedback": "不对，AB是长方形的一条边，不是折叠轴。" },
          { "text": "CD", "feedback": "不对，F在CD上，但折叠轴不是CD。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "choice",
        "question": "点D折叠后的对应点是哪个点？",
        "options": [
          { "text": "A₁", "feedback": "不对，A对应的是A₁。" },
          { "text": "D₁", "feedback": "正确，题干说D的对应点是D₁。" },
          { "text": "F", "feedback": "不对，F在折叠轴上，位置不变。" }
        ],
        "correctIndex": 1
      },
      {
        "type": "choice",
        "question": "根据折叠性质，下面哪两个角相等？",
        "options": [
          { "text": "∠DFE＝∠EFD₁", "feedback": "正确，折叠后FD和FD₁关于EF对称。" },
          { "text": "∠1＝∠3", "feedback": "这个结论后面可以由平行关系得到，但不是直接由折叠得到的。" },
          { "text": "∠2＝∠3", "feedback": "不对，∠2和∠3不一定相等。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "input",
        "question": "设∠2＝x°，因为∠1＝2∠2，那么∠1可以表示为多少？",
        "acceptedAnswers": ["2x", "2x°", "2*x", "2×x", "2乘x", "2 x"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，∠1是∠2的2倍。",
        "feedbackWrong": "注意题干说∠1＝2∠2。"
      },
      {
        "type": "input",
        "question": "由折叠可知∠DFE＝∠EFD₁，因此可列关系式：180°－∠1＝∠1＋∠2。把∠1＝2x，∠2＝x代入，可得x是多少度？",
        "acceptedAnswers": ["36", "36°", "36度"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，∠2＝36°。",
        "feedbackWrong": "可以先列：180－2x＝2x＋x。"
      },
      {
        "type": "input",
        "question": "所以∠1＝2∠2，∠3与∠1对应相等，∠3是多少度？",
        "acceptedAnswers": ["72", "72°", "72度"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，∠3＝72°，选C。",
        "feedbackWrong": "先求∠1＝2×36°，再利用AB∥CD。"
      }
    ]
  },
  {
    "id": "q2",
    "title": "垂直平分线读题",
    "tag": "线段关系",
    "level": "中等",
    "image": "images/q2.png",
    "problem": "如图，在△ABC中，分别以A、C为圆心，大于1/2AC长为半径作弧，两弧分别相交于M、N两点，作直线MN，分别交线段BC、AC于点D、E，若AE＝3cm，△ABD的周长为10cm，则△ABC的周长为（ ） A.13cm B.14cm C.15cm D.16cm",
    "steps": [
      {
        "type": "choice",
        "question": "题目中用两圆弧作出的直线MN是什么线？",
        "options": [
          { "text": "AC的垂直平分线", "feedback": "正确，这种作图方法得到的是线段AC的垂直平分线。" },
          { "text": "BC的垂直平分线", "feedback": "不对，作弧的圆心是A和C，针对的是线段AC。" },
          { "text": "∠A的角平分线", "feedback": "不对，图中不是作角平分线的步骤。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "choice",
        "question": "因为MN是AC的垂直平分线，点E在线段AC上，所以E是什么点？",
        "options": [
          { "text": "AC的中点", "feedback": "正确，垂直平分线与AC的交点就是AC的中点。" },
          { "text": "BC的中点", "feedback": "不对，E在线段AC上，不在线段BC上。" },
          { "text": "△ABC的重心", "feedback": "不对，题目没有涉及三角形重心。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "choice",
        "question": "点D在AC的垂直平分线上，可以得到哪两个线段相等？",
        "options": [
          { "text": "AD＝CD", "feedback": "正确，垂直平分线上的点到线段两端距离相等。" },
          { "text": "BD＝CD", "feedback": "不对，D在BC上不能说明它是BC的中点。" },
          { "text": "AB＝AC", "feedback": "不对，题目没有说明△ABC是等腰三角形。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "input",
        "question": "已知AE＝3cm，且E是AC的中点，那么AC等于多少cm？",
        "acceptedAnswers": ["6", "6cm", "6厘米"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，AC＝2AE＝6cm。",
        "feedbackWrong": "注意E是AC的中点，所以AC是AE的2倍。"
      },
      {
        "type": "input",
        "question": "△ABD的周长为10cm，也就是AB＋BD＋AD等于多少？",
        "acceptedAnswers": ["10", "10cm", "10厘米", "AB+BD+AD=10", "AB＋BD＋AD=10", "AB+BD+AD=10cm", "AB＋BD＋AD＝10"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，△ABD的周长就是AB、BD、AD三条边的和。",
        "feedbackWrong": "看清楚是△ABD的周长，不是△ABC的周长。"
      },
      {
        "type": "input",
        "question": "因为AD＝CD，且BC＝BD＋CD，所以△ABC的周长是多少cm？",
        "acceptedAnswers": ["16", "16cm", "16厘米"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，△ABC的周长为16cm，选D。",
        "feedbackWrong": "可把AB＋BC＋AC转化为AB＋BD＋AD＋AC。"
      }
    ]
  },
  {
    "id": "q4",
    "title": "平行线中的折线角",
    "tag": "角度关系",
    "level": "中等",
    "image": "images/q4.png",
    "problem": "如图，已知AB∥DE，∠1＝20°，∠2＝∠C，则∠C的度数为********。",
    "steps": [
      {
        "type": "choice",
        "question": "题目中给出的平行关系是哪两条直线？",
        "options": [
          { "text": "AB∥DE", "feedback": "正确，这是本题转化角度的关键条件。" },
          { "text": "BC∥CD", "feedback": "不对，图中没有说明BC和CD平行。" },
          { "text": "AB∥CD", "feedback": "不对，题干给出的是AB∥DE。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "choice",
        "question": "∠1的度数是多少？",
        "options": [
          { "text": "20°", "feedback": "正确，题干直接给出∠1＝20°。" },
          { "text": "70°", "feedback": "不对，题目中没有给出70°。" },
          { "text": "100°", "feedback": "不对，这是可能算出的结果，不是已知∠1。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "choice",
        "question": "如果设∠2＝x°，根据∠2＝∠C，∠C应表示为多少？",
        "options": [
          { "text": "x°", "feedback": "正确，∠2和∠C相等。" },
          { "text": "2x°", "feedback": "不对，题目说相等，不是2倍关系。" },
          { "text": "180°－x°", "feedback": "不对，这里没有说∠2和∠C互补。" }
        ],
        "correctIndex": 0
      },
      {
        "type": "input",
        "question": "过点C作AB的平行线，因为AB∥DE，所以这条线也平行于DE。由∠1＝20°，可得到点C处分出的一个小角是多少度？",
        "acceptedAnswers": ["20", "20°", "20度"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，平行线可以把∠1转移到点C附近。",
        "feedbackWrong": "注意利用AB∥DE，对应的夹角仍是20°。"
      },
      {
        "type": "input",
        "question": "设∠2＝x°，则∠C＝x°。根据图形角度关系可列：x＝20＋(180－x)。解得x是多少？",
        "acceptedAnswers": ["100", "100°", "100度"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，∠C＝100°。",
        "feedbackWrong": "先移项：x＝200－x，所以2x＝200。"
      },
      {
        "type": "input",
        "question": "所以∠C的度数是多少？",
        "acceptedAnswers": ["100", "100°", "100度"],
        "placeholder": "请输入答案",
        "feedbackCorrect": "正确，∠C＝100°。",
        "feedbackWrong": "注意∠2和∠C相等，不能只写∠1的20°。"
      }
    ]
  }
];
// ============================================================
// 【题目数据结束】
// ============================================================
