/** 字數計算
 * @param content 欲分析的字串內容
 * @returns {english,}
 */
export function textCounter(content) {
  // console.log(content)
  // let str = 'Hello 123, 這是一段測試文字。 にほんご／にっぽんご ㄲ, ㄴ, ㄷ, ㄸ, ㄹ, ㅁ, ㅂ, ㅃ. ㅅ, ㅆ, ㅇ, ㅈ, ㅉ, ㅊ, ㅋ, ㅌ, ㅍ'
  if (!content) return { other: 0 }
  if (typeof content != 'string') return { other: 0 }

  // 定義正規表達式
  const regex_character = /[\x00-\x7F]/g
  const regex_other = /[^\x00-\x7F]/g

  // 使用 match() 方法進行匹配
  const matches_c = content.match(regex_character)
  const matches_o = content.match(regex_other)

  return {
    count: matches_c ? matches_c.length : 0,
    other: matches_o ? matches_o.length : 0
  }
}
