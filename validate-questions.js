// ============================================================
// 题库校验脚本 validate-questions.js
// 用途：发布前检查 questions.js 是否有明显的数据结构错误。
// 运行：node validate-questions.js  或  npm run validate
//
// 说明：
//  - 严重问题 => 记为 error（最终退出码为 1）
//  - 不影响运行的小问题 => 记为 warning（退出码仍为 0）
//  - 本脚本只检查结构，不修改、不生成任何数学题内容。
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const QUESTIONS_FILE = path.join(ROOT, 'questions.js');

const errors = [];
const warnings = [];

function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ------------------------------------------------------------
// 1. 载入 questions.js（它声明的是全局 const questionsData，没有 module.exports）
//    用 vm 在隔离上下文里执行，再把 questionsData 取出来。
// ------------------------------------------------------------
function loadQuestions() {
  if (!fs.existsSync(QUESTIONS_FILE)) {
    err(`找不到 questions.js 文件：${QUESTIONS_FILE}`);
    return null;
  }
  const code = fs.readFileSync(QUESTIONS_FILE, 'utf8');
  const sandbox = {};
  try {
    vm.createContext(sandbox);
    // 末尾追加导出语句，把 questionsData 暴露给沙箱
    vm.runInContext(code + '\n;this.__questionsData = (typeof questionsData !== "undefined") ? questionsData : undefined;', sandbox);
  } catch (e) {
    err(`解析 questions.js 时发生语法错误：${e.message}`);
    return null;
  }
  const data = sandbox.__questionsData;
  if (typeof data === 'undefined') {
    err('questions.js 中没有找到名为 questionsData 的数组。');
    return null;
  }
  if (!Array.isArray(data)) {
    err('questionsData 不是数组。');
    return null;
  }
  return data;
}

// 微变式 / 补练题混入主线的可疑关键词
const REMEDIAL_KEYWORDS = ['针对性补练', '微变式', '补练题', '补救题'];

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function validateStep(q, qLabel, step, stepIndex) {
  const stepLabel = `${qLabel} 第 ${stepIndex + 1} 步`;

  if (step === null || typeof step !== 'object' || Array.isArray(step)) {
    err(`${stepLabel}：step 不是合法对象。`);
    return;
  }

  // 4. 每个 step 必须有 type 和 question
  if (!isNonEmptyString(step.type)) {
    err(`${stepLabel}：缺少 type 字段。`);
  }
  if (!isNonEmptyString(step.question)) {
    err(`${stepLabel}：缺少 question 字段。`);
  }

  // 5. choice 类型校验
  if (step.type === 'choice') {
    if (!('options' in step)) {
      err(`${stepLabel}（choice）：缺少 options 字段。`);
    } else if (!Array.isArray(step.options)) {
      err(`${stepLabel}（choice）：options 必须是数组。`);
    } else if (step.options.length === 0) {
      err(`${stepLabel}（choice）：options 不能为空。`);
    } else {
      step.options.forEach((opt, i) => {
        // 选项可能是字符串，也可能是 { text, feedback } 对象
        let text;
        if (typeof opt === 'string') text = opt;
        else if (opt && typeof opt === 'object') text = opt.text;
        if (!isNonEmptyString(text)) {
          err(`${stepLabel}（choice）：第 ${i + 1} 个选项缺少文本内容。`);
        }
      });
    }

    if (!('correctIndex' in step)) {
      err(`${stepLabel}（choice）：缺少 correctIndex 字段。`);
    } else if (typeof step.correctIndex !== 'number' || !Number.isInteger(step.correctIndex)) {
      err(`${stepLabel}（choice）：correctIndex 必须是整数。`);
    } else if (Array.isArray(step.options) &&
               (step.correctIndex < 0 || step.correctIndex >= step.options.length)) {
      err(`${stepLabel}（choice）：correctIndex (${step.correctIndex}) 越界，options 共 ${step.options.length} 项。`);
    }
  }

  // 6. input 类型校验
  if (step.type === 'input') {
    if (!('acceptedAnswers' in step)) {
      err(`${stepLabel}（input）：缺少 acceptedAnswers 字段。`);
    } else if (!Array.isArray(step.acceptedAnswers)) {
      err(`${stepLabel}（input）：acceptedAnswers 必须是数组。`);
    } else if (step.acceptedAnswers.length === 0) {
      err(`${stepLabel}（input）：acceptedAnswers 不能为空。`);
    }
  }

  // type 既不是 choice 也不是 input，给警告
  if (isNonEmptyString(step.type) && step.type !== 'choice' && step.type !== 'input') {
    warn(`${stepLabel}：未知的 type "${step.type}"（目前只识别 choice / input）。`);
  }

  // 7. remedial 字段校验
  if ('remedialQuestion' in step) {
    const hasAnswer = isNonEmptyString(step.remedialAnswer);
    const hasOptions = Array.isArray(step.remedialOptions) && step.remedialOptions.length > 0;
    if (!hasAnswer && !hasOptions) {
      err(`${stepLabel}：有 remedialQuestion 但既没有 remedialAnswer 也没有 remedialOptions。`);
    }
  }
  if ('remedialOptions' in step) {
    if (!Array.isArray(step.remedialOptions)) {
      err(`${stepLabel}：remedialOptions 必须是数组。`);
    } else {
      if (!('remedialCorrectIndex' in step)) {
        err(`${stepLabel}：有 remedialOptions 但缺少 remedialCorrectIndex。`);
      } else if (typeof step.remedialCorrectIndex !== 'number' || !Number.isInteger(step.remedialCorrectIndex)) {
        err(`${stepLabel}：remedialCorrectIndex 必须是整数。`);
      } else if (step.remedialCorrectIndex < 0 || step.remedialCorrectIndex >= step.remedialOptions.length) {
        err(`${stepLabel}：remedialCorrectIndex (${step.remedialCorrectIndex}) 越界，remedialOptions 共 ${step.remedialOptions.length} 项。`);
      }
    }
  }

  // 8. 主线 step 里混入微变式 / 补练题字样 => 警告（不自动删除）
  if (isNonEmptyString(step.question)) {
    const hit = REMEDIAL_KEYWORDS.find(k => step.question.includes(k));
    if (hit) {
      warn(`${stepLabel}：主线 question 中出现疑似补练字样「${hit}」，请人工确认是否为微变式题误混入主线。`);
    }
  }

  // 9. priority 校验
  if ('priority' in step) {
    if (typeof step.priority !== 'number') {
      err(`${stepLabel}：priority 必须是数字。`);
    }
  } else {
    warn(`${stepLabel}：缺少 priority（可选，仅提醒）。`);
  }

  // 10. skillTag 校验
  if (!isNonEmptyString(step.skillTag)) {
    warn(`${stepLabel}：缺少 skillTag（可选，仅提醒）。`);
  }
}

function validateQuestion(q, index) {
  const qLabel = q && isNonEmptyString(q.id) ? `题目 ${q.id}` : `第 ${index + 1} 道题`;

  if (q === null || typeof q !== 'object' || Array.isArray(q)) {
    err(`${qLabel}：题目不是合法对象。`);
    return;
  }

  // 1. 必填字段：id / title / problem / image / steps
  if (!isNonEmptyString(q.id)) err(`${qLabel}：缺少 id 字段。`);
  if (!isNonEmptyString(q.title)) err(`${qLabel}：缺少 title 字段。`);
  if (!isNonEmptyString(q.problem)) err(`${qLabel}：缺少 problem 字段。`);
  if (!isNonEmptyString(q.image)) {
    err(`${qLabel}：缺少 image 字段。`);
  } else {
    // 2. image 路径必须真实存在
    const imgPath = path.join(ROOT, q.image);
    if (!fs.existsSync(imgPath)) {
      err(`${qLabel}：image 路径不存在 -> ${q.image}`);
    }
  }

  // 3. steps 必须是非空数组
  if (!('steps' in q)) {
    err(`${qLabel}：缺少 steps 字段。`);
    return;
  }
  if (!Array.isArray(q.steps)) {
    err(`${qLabel}：steps 必须是数组。`);
    return;
  }
  if (q.steps.length === 0) {
    err(`${qLabel}：steps 不能为空。`);
    return;
  }

  q.steps.forEach((step, i) => validateStep(q, qLabel, step, i));
}

// ------------------------------------------------------------
// 主流程
// ------------------------------------------------------------
function main() {
  const data = loadQuestions();

  if (data) {
    console.log(`检测到题库共 ${data.length} 道题。\n`);
    // id 重复检查（顺带做一个基础检查）
    const seen = new Set();
    data.forEach((q, i) => {
      if (q && isNonEmptyString(q.id)) {
        if (seen.has(q.id)) err(`题目 id 重复：${q.id}`);
        seen.add(q.id);
      }
      validateQuestion(q, i);
    });
  }

  if (warnings.length > 0) {
    console.log('⚠️  警告（不会导致校验失败）：');
    warnings.forEach(w => console.log('   - ' + w));
    console.log('');
  }

  if (errors.length > 0) {
    console.log('❌ 发现错误：');
    errors.forEach(e => console.log('   - ' + e));
    console.log(`\n校验未通过，共 ${errors.length} 个错误。`);
    process.exit(1);
  }

  console.log('✅ 题库校验通过');
  process.exit(0);
}

main();
