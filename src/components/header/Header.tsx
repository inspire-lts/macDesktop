import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Iconfont } from '../iconfont'
import './index.scss'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
const Header = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState(dayjs().format('M月DD日 周dd HH:mm'))
  const [menuShow, setMenuShow] = useState(false)
  const [inputShow, setInputShow] = useState(false)

  const windowClick = useCallback(
    ({ target }) => {
      if (inputShow || menuShow) {
        if (
          target.parentNode === menuRef.current ||
          target.parentNode.parentNode === menuRef.current
        ) {
          return
        }
        setMenuShow(false)
        setInputShow(false)
      }
    },
    [inputShow, menuShow]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = dayjs().format('M月DD日 周dd HH:mm')
      setTime(newTime)
    }, 60000)
    window.addEventListener('click', windowClick)
    return () => {
      window.removeEventListener('click', windowClick)
      window.clearInterval(interval)
    }
  }, [windowClick])

  return (
    <header className="AppFinder">
      <div className="FinderLeft">
        <div>
          <Iconfont
            type="icon-apple"
            style={{
              fontSize: 16
            }}
          />
        </div>
        <div>文件</div>
        <div>编辑</div>
        <div>显示</div>
        <div>前往</div>
        <div>窗口</div>
        <div>帮助</div>
      </div>
      <div className="FinderRight">
        <div>{time}</div>
      </div>
    </header>
  )
}

export default Header
