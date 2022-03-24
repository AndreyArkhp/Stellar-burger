import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import  styles  from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
    <div className={styles.header_content}>
      <nav className={styles.header_item}>
          <ul className={`${styles.nav_list} mt-4 mb-4`}>
            <li className='mr-2'><a href='#' className={`p-5 ${styles.a}`}><BurgerIcon type="primary" /><p className={`${styles.para_menu} pl-2 text text_type_main-default`}>Конструктор</p></a></li>
            <li><a href='#' className={`p-5 ${styles.a}`}> <ListIcon type="primary"
            /><p className={`${styles.para_menu} pl-2 text text_type_main-default`}>Лента заказов</p></a></li>
          </ul>
      </nav>
        <div className={styles.logo_container}> <a href='#' className={`${styles.logo_link} mt-2`}><Logo /></a></div>
        <div className={styles.personal}><a href='#' className={`p-5 ${styles.a}`}><ProfileIcon type="primary" /><p className={`${styles.para_menu} text text_type_main-default pl-2`}>Личный кабинет</p></a></div>
        
    </div>
    </header>
  )
}

export default AppHeader;