import React from 'react';
import styles from '../../scss/components/_not-faund-block.module.scss';

export function NotFoundBlock() {
  return (
    <div class={styles.root}>
        <span>😕</span>
            <h2>Ничего не найдено</h2>
            <p className={styles.description}>К сожалению данная страница отсутствует в нашем интернет магазине</p>
           
          </div>
  )
}
