import { defineAsyncComponent } from 'vue'

import RoundCloseWhite from '~/assets/images/svg/round_close_white.svg'

const BudgetrLogo = defineAsyncComponent(() => import('~/assets/images/svg/app-logoo.svg'))

export default {
  RoundCloseWhite,
  BudgetrLogo
}
