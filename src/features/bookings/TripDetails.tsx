import React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  IconButton,
  useTheme,
  useColorModeValue,
  Divider,
} from 'native-base';
import { Pressable, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TripDetailsScreenProps } from '../../types';

const TripDetails = ({ navigation }: TripDetailsScreenProps) => {
  const canGoback = navigation.canGoBack();
  const { colors } = useTheme();

  return (
    <Box
      flex={1}
      _dark={{ bg: 'muted.900' }}
      _light={{ bg: 'muted.50' }}
      p='4'
      justifyContent='space-between'>
      <VStack space='4' flex='1'>
        <HStack space='2' justifyContent='space-between' alignItems='center'>
          {canGoback && (
            <Box>
              <IconButton
                onPress={() => navigation.goBack()}
                variant='solid'
                size='sm'
                _icon={{
                  as: AntDesign,
                  name: 'arrowleft',
                }}
              />
            </Box>
          )}
          <Box flex='1' alignItems={canGoback ? 'center' : 'flex-start'}>
            <Heading color='primary.500' size='lg'>
              Trip details
            </Heading>
          </Box>
        </HStack>

        <Divider bg='primary.500' />

        <Timeline
          timeContainerStyle={styles.timeContainer}
          circleColor={colors.primary[300]}
          lineColor={colors.primary[500]}
          innerCircle='dot'
          detailContainerStyle={[
            styles.detailContainer,
            {
              backgroundColor: useColorModeValue(
                colors.muted[50],
                colors.muted[700],
              ),
              borderColor: useColorModeValue(
                colors.muted[200],
                colors.muted[800],
              ),
            },
          ]}
          timeStyle={[
            styles.time,
            { color: colors.white, backgroundColor: colors.primary[500] },
          ]}
          titleStyle={{
            color: useColorModeValue(colors.darkText, colors.lightText),
          }}
          descriptionStyle={{
            color: useColorModeValue(colors.light[800], colors.light[300]),
          }}
          data={[
            {
              time: '09:00',
              title: 'Event 1',
              description: 'Event 1 Description',
            },
            {
              time: '10:45',
              title: 'Event 2',
              description: 'Event 2 Description',
            },
            {
              time: '12:00',
              title: 'Event 3',
              description: 'Event 3 Description',
            },
            {
              time: '14:00',
              title: 'Event 4',
              description: 'Event 4 Description',
            },
            {
              time: '16:30',
              title: 'Event 5',
              description: 'Event 5 Description',
            },
          ]}
          listViewContainerStyle={styles.timeline}
          columnFormat='two-column'
          separator={false}
        />
      </VStack>

      <VStack mt='6' space='2' alignItems='center'>
        {/* <ToggleDarkMode /> */}
        <Pressable
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'SearchOrigins' }],
            })
          }>
          <Text
            underline
            _dark={{ color: 'muted.200' }}
            _light={{
              color: 'muted.600',
            }}>
            Back to start
          </Text>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default TripDetails;

const offsetValue = 6;
const borderRadius = 10;

const styles = StyleSheet.create({
  timeline: { paddingTop: offsetValue },
  timeContainer: {
    marginTop: -offsetValue,
  },
  time: {
    textAlign: 'center',
    padding: 5,
    borderRadius: borderRadius,
  },
  detailContainer: {
    borderWidth: 1,
    marginTop: -offsetValue,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: borderRadius,
  },
});
