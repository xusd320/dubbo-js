/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import debug from 'debug';
import {FunctionDeclarationStructure} from 'ts-simple-ast';

const log = debug('j2t:core:toBeanClass');

export function toProxyFunc({
  typeName,
  typePath,
  version,
  group,
}: {
  typeName: string;
  typePath: string;
  version: string;
  group?: string;
}): FunctionDeclarationStructure {
  let parameters = [{name: 'dubbo', isReadOnly: true, type: 'Dubbo'}];

  log('调用转换方法 toProxyFunc::');
  return {
    name: `${typeName}`,
    isExported: true,
    returnType: `${'I' + typeName}`,
    parameters,
    bodyText: `return dubbo.proxyService<${'I' + typeName}>({
        dubboInterface: '${typePath}',
        version: '${version}',
        ${group ? "group:'" + group + "'," : ''}
        methods: ${typeName}Wrapper,
      }); `,
  };
}