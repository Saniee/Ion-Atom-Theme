# Ion demo (CMake): one file that touches most token kinds.
cmake_minimum_required(VERSION 3.20)
project(ion_demo VERSION 0.4.9 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
option(ION_WARNINGS "Enable extra warnings" ON)

add_executable(ion_demo ../cpp/main.cpp)
target_compile_features(ion_demo PRIVATE cxx_std_20)

if(ION_WARNINGS AND NOT MSVC)
  target_compile_options(ion_demo PRIVATE -Wall -Wextra)
elseif(WIN32)
  message(STATUS "Building on Windows with ${CMAKE_CXX_COMPILER_ID}")
endif()

set_target_properties(ion_demo PROPERTIES
  OUTPUT_NAME "ion-demo"
  RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/bin"
)

message(STATUS [[Bracket "argument" kept as-is]])
message(STATUS "Home: $ENV{HOME}\tbuild type: ${CMAKE_BUILD_TYPE}")
