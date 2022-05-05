import { h } from 'vue';
import { generatorId, transformToBool } from '../../utils';

const AtInputAddOnSelect = (props, { emit, slots }) => {
  return h(
    'select',
    {
      id: props.id,
      value: props.modelValue,
      disabled: transformToBool(props.disabled),
      class: [
        'focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 border-transparent bg-transparent text-gray-500 sm:text-sm dark:text-white',
        props.side === 'left' ? 'rounded-l-md pl-3 pr-7' : 'rounded-r-md pr-3 pl-7',
        { 'cursor-not-allowed': transformToBool(props.disabled) },
      ],
      onChange: event => emit('update:modelValue', event.target.value),
    },
    [
      props.items.map(item =>
        'item' in slots
          ? slots.item({ item })
          : h(
              'option',
              {
                value: item[props.valueType],
                selected: item[props.valueType] === props.modelValue,
              },
              item.title
            )
      ),
    ]
  );
};

AtInputAddOnSelect.props = {
  id: { type: String, default: () => generatorId('at-input-add-on-select-') },
  modelValue: { type: [String, Number], default: '' },
  items: { type: Array, default: [] },
  valueType: { type: String, default: 'value' },
  side: { type: String, default: 'left', validator: value => value === 'left' || value === 'right' },
  disabled: { type: [Boolean, Number, String], default: false },
};

export default AtInputAddOnSelect;
