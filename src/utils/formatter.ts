export const dateFormatter = new Intl.DateTimeFormat('pt-BR') // Intl é uma api de internacionalização do próprio JS - formatando datas - observar que estamos instanciado um objeto, ou seja, essa variável 'dateFormatter' vai receber vários métodos que vamos usar

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}) // vamos colocar no objeto que é pra formatar colocando o preço em real na frente do número
