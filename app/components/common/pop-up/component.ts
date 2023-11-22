import { Owner } from '@ember/test-helpers/build-owner';
import Component from '@glimmer/component';

enum Align {
  Center = 'center',
  Right = 'right',
}

interface PopUpArgs {
  alignment: Align;
}

export default class PopUpComponent extends Component<PopUpArgs> {
  alignment: Align;

  constructor(owner: Owner, args: PopUpArgs) {
    super(owner, args);

    this.alignment = this.args.alignment || Align.Center;
  }
}
