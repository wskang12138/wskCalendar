import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { View } from '@tarojs/components';
import { websiteRoutes, demosRoutes } from '@/website/routers';
import './index.scss';

const Website = lazy(() => import('@/website/index'));
const Demos = lazy(() => import('./../demos/index'));

function Index() {
  console.log(websiteRoutes, 888)
  return (
    <BrowserRouter>


      <View>
        <Suspense fallback={<View className='lazy-fallback'>loading...</View>}>
          <Routes>
            <Route path='' element={<Navigate to='website' />} />
            <Route path='/website' element={<Website />}>
              <Route path='' element={<Navigate to='home' />} />
              {
                websiteRoutes.map((item, itemIndex) =>
                  <Route
                    key={`website-${itemIndex}`}
                    path={item.path}
                    element={React.createElement(item.component)}
                  >
                    <Route path='' element={<Navigate to={item.subRoutes?.[0].path ?? ''} />} />
                    {
                      item.subRoutes?.map((subItem, subIndex) =>
                        <Route
                          key={`website-${itemIndex}-${subIndex}`}
                          path={subItem.path}
                          element={React.createElement(subItem.component)}
                        />
                      )
                    }
                  </Route>
                )
              }
            </Route>
            <Route path='/~demos' element={<Demos />}>
              {
                demosRoutes.map((item: any, itemIndex) =>
                  <Route
                    key={`demos-${itemIndex}`}
                    path={item.path}
                    element={React.createElement(item.component)}
                  />
                )
              }
            </Route>
          </Routes>
        </Suspense>
      </View>
    </BrowserRouter>
  )
}

export default Index;
