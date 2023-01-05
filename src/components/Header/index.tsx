import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog' // importando o nosso modal da biblioteca radix - tudo da biblioteca vai ficar dentro de Dialog - podemos desestruturar e pegar somente o 'Root'
import logoImage from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="" />

        <Dialog.Root>
          {' '}
          {/* Dialog.Root fica em volta de todo o contexto do modal (do botão e do próprio modal) */}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>{' '}
          {/* asChild é para que não seja criado um novo botão - porque Trigger seria o botão que abre o modal */}
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
