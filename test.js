const assert      = require('assert');
const cc2sep      = require('./index');
let numAssertions = 0;

function checkFn(fn, cases)
{
    cases.forEach(
        ([actual, expected, trim], index) =>
        {
            for (const _separator of ['', '_', '-', '.'])
            {
                const _actual   = _separator
                    ? actual.replace(/-/g, _separator)
                    : actual;
                const _expected = _separator
                    ? expected.replace(/-/g, _separator)
                    : expected;
                const _result   = fn(_actual, _separator, trim);
                assert.equal(
                    _result,
                    _expected,
                    `${fn.name} [${index}] ${_actual} [${_separator}]: ${_result} !== ${_expected}`
                );
                ++numAssertions;
            }
        }
    );
}

checkFn(
    cc2sep,
    [
        ['', ''],
        ['onceuponatime',    'onceuponatime',                 false ],
        ['onceUponATime',    'once-upon-a-time',              false ],
        ['OnceUponATime',    '-once-upon-a-time',             false ],
        ['ONCE UPON A TIME', '-o-n-c-e -u-p-o-n -a -t-i-m-e', false ],
        ['once-upon-a-time', 'once-upon-a-time',              false ],
        ['innerHTML',        'inner-h-t-m-l',                 false ],
        ['ÁáááÉéééÍíÓóó',    '-áááá-éééé-íí-óóó',             false ],
        ['onceuponatime',    'onceuponatime',                 true  ],
        ['onceUponATime',    'once-upon-a-time',              true  ],
        ['OnceUponATime',    'once-upon-a-time',              true  ],
        ['ONCE UPON A TIME', 'o-n-c-e u-p-o-n a t-i-m-e',     true  ],
        ['once-upon-a-time', 'once-upon-a-time',              true  ],
        ['innerHTML',        'inner-h-t-m-l',                 true  ],
        ['ÁáááÉéééÍíÓóó',    'áááá-éééé-íí-óóó',              true  ]
    ]
);
console.log('Total aserciones: %d', numAssertions);
