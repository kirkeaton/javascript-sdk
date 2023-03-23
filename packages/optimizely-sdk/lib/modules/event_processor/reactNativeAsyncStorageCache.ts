/**
 * Copyright 2022, Optimizely
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import PersistentKeyValueCache from './persistentKeyValueCache';

export default class ReactNativeAsyncStorageCache implements PersistentKeyValueCache {
  get(key: string): Promise<any | null> {
    return AsyncStorage.getItem(key).then((val: string | null) => {
      if (!val) {
        return null;
      }
      return JSON.parse(val);
    });
  }

  /* eslint-disable */
  set(key: string, val: any): Promise<void> {
    try {
      return AsyncStorage.setItem(key, JSON.stringify(val));
    } catch (ex) {
      return Promise.reject(ex);
    }
  }
  /* eslint-enable */

  contains(key: string): Promise<boolean> {
    return AsyncStorage.getItem(key).then((val: string | null) => val !== null);
  }

  remove(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}