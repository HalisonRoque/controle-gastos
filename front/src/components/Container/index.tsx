import styles from "./styles.module.css"

/*Componente Container padrão usado em vários lugares do código */
type ContainerProps = {
  children: React.ReactNode
}
export function Container({ children }: ContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
