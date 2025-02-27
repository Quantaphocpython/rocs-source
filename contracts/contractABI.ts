export const contractABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'cardId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'attack',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'health',
        type: 'uint256',
      },
    ],
    name: 'CardAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'monsterId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'health',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'attack',
        type: 'uint256',
      },
    ],
    name: 'MonsterAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_attack',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_health',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maxPerSession',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_staminaCost',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_image',
        type: 'string',
      },
      {
        internalType: 'enum DeckType.OnAttackEffect',
        name: '_onAttackEffect',
        type: 'uint8',
      },
      {
        internalType: 'enum DeckType.OnDeadEffect',
        name: '_onDeadEffect',
        type: 'uint8',
      },
      {
        internalType: 'enum DeckType.OnDefenseEffect',
        name: '_onDefenseEffect',
        type: 'uint8',
      },
      {
        internalType: 'enum DeckType.ActiveSkill',
        name: '_activeSkill',
        type: 'uint8',
      },
      {
        internalType: 'enum DeckType.Class[]',
        name: '_classes',
        type: 'uint8[]',
      },
    ],
    name: 'addCard',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_health',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_attack',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_image',
        type: 'string',
      },
      {
        internalType: 'enum DeckType.Class[]',
        name: '_classes',
        type: 'uint8[]',
      },
    ],
    name: 'addMonster',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAllMonsters',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'health',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'attack',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'image',
                type: 'string',
              },
              {
                internalType: 'enum DeckType.Class[]',
                name: 'classes',
                type: 'uint8[]',
              },
            ],
            internalType: 'struct DeckType.Monster',
            name: 'monster',
            type: 'tuple',
          },
        ],
        internalType: 'struct DeckResponse.MonsterWithId[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_cardId',
        type: 'uint256',
      },
    ],
    name: 'getCardById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'attack',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'health',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'maxPerSession',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'staminaCost',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'image',
                type: 'string',
              },
              {
                internalType: 'enum DeckType.OnAttackEffect',
                name: 'onAttackEffect',
                type: 'uint8',
              },
              {
                internalType: 'enum DeckType.OnDeadEffect',
                name: 'onDeadEffect',
                type: 'uint8',
              },
              {
                internalType: 'enum DeckType.OnDefenseEffect',
                name: 'onDefenseEffect',
                type: 'uint8',
              },
              {
                internalType: 'enum DeckType.ActiveSkill',
                name: 'activeSkill',
                type: 'uint8',
              },
              {
                internalType: 'enum DeckType.Class[]',
                name: 'classes',
                type: 'uint8[]',
              },
            ],
            internalType: 'struct DeckType.Card',
            name: 'card',
            type: 'tuple',
          },
        ],
        internalType: 'struct DeckResponse.CardWithId',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pageIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'pageSize',
        type: 'uint256',
      },
    ],
    name: 'getCardsPaginated',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'id',
                    type: 'uint256',
                  },
                  {
                    internalType: 'string',
                    name: 'name',
                    type: 'string',
                  },
                  {
                    internalType: 'uint256',
                    name: 'attack',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'health',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'maxPerSession',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'staminaCost',
                    type: 'uint256',
                  },
                  {
                    internalType: 'string',
                    name: 'image',
                    type: 'string',
                  },
                  {
                    internalType: 'enum DeckType.OnAttackEffect',
                    name: 'onAttackEffect',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DeckType.OnDeadEffect',
                    name: 'onDeadEffect',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DeckType.OnDefenseEffect',
                    name: 'onDefenseEffect',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DeckType.ActiveSkill',
                    name: 'activeSkill',
                    type: 'uint8',
                  },
                  {
                    internalType: 'enum DeckType.Class[]',
                    name: 'classes',
                    type: 'uint8[]',
                  },
                ],
                internalType: 'struct DeckType.Card',
                name: 'card',
                type: 'tuple',
              },
            ],
            internalType: 'struct DeckResponse.CardWithId[]',
            name: 'cardsPage',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'totalPages',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalElements',
            type: 'uint256',
          },
        ],
        internalType: 'struct DeckResponse.PaginatedCardsWithId',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_monsterId',
        type: 'uint256',
      },
    ],
    name: 'getMonsterById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'name',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'health',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'attack',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'image',
                type: 'string',
              },
              {
                internalType: 'enum DeckType.Class[]',
                name: 'classes',
                type: 'uint8[]',
              },
            ],
            internalType: 'struct DeckType.Monster',
            name: 'monster',
            type: 'tuple',
          },
        ],
        internalType: 'struct DeckResponse.MonsterWithId',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
