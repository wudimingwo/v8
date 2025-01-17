// Copyright 2019 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";


function RandomHexDigit(allow_zero) {
  const chars = allow_zero ? '0123456789ABCDEF' : '123456789ABCDEF';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}


// Some benchmarks shall compute sums but the result must not grow in terms
// of digits. These can use "small" BigInts, which are BigInts where the most
// significant bits of a digit are 0, so it does not overflow.
function SmallRandomBigIntWithBits(bits) {
  console.assert(bits % 4 === 0);
  if (bits <= 0) {
    return 0n;
  }

  let s = "0x" + RandomHexDigit(false);
  bits -= 4;
  // Digits are at least 32 bits long, so we round down to the next smaller
  // multiple of 32 to keep the most significant digit small.
  bits = Math.floor(bits / 32) * 32;
  for (; bits > 0; bits -= 4) {
    s += RandomHexDigit(true);
  }
  return BigInt(s);
}


function MaxBigIntWithBits(bits) {
  console.assert(bits % 4 === 0);
  if (bits <= 0) {
    return 0n;
  }

  let s = "0x";
  for (; bits > 0; bits -= 4) {
    s += "F";
  }
  return BigInt(s);
}
