describe('Get array by regex', () => {
  it('renders props.msg when passed', () => {
    const rawStr = 'a1 B23 / 그리고 \n c4 d15 / hello \t b7 안녕하세요'
    console.log(rawStr.match(/\w{1}\d{1,2}/gi))
    expect(rawStr.match(/\w{1}\d{1,2}/gi).length).toBe(5)
  })
})