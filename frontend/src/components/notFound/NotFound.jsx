import React from 'react'
import { Container } from 'react-bootstrap'
import notFoundImg from '../../assets/NotFound.jpg'
import styles from './notFound.module.scss'

const NotFound = () => {
    return (
        <Container className={styles.notFoundPage}>
            <img className={styles.notFoundImg} src={notFoundImg} alt="Not Found" />
            <div className={styles.content}>
                <p className={styles.head}>Страница не найдена</p>
                <p>Кажется, что-то пошло не так!<br/>
                    Запрашиваемая страница не существует.<br/>
                    Возможно, она устарела или была удалена.</p>
            </div>
        </Container>
    )
}

export default NotFound